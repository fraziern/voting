import fetch from 'isomorphic-fetch';
import $ from 'jquery';
import { browserHistory } from 'react-router';

// this defines the actions available

// TODO need to have a better response for successful async actions
// TODO Passport integration with owners
// TODO pick jquery or fetch, don't need both

// Private helper functions

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

// *** Private actinos ***

function requestPolls() {
  return {
    type: 'REQUEST_POLLS'
  };
}

function receivePolls(json) {
  return {
    type: 'RECEIVE_POLLS',
    polls: json.polls
  };
}

function fetchPolls() {
  return dispatch => {
    dispatch(requestPolls());
    return fetch('/api/getPolls')
      .then(checkStatus)
      .then(parseJSON)
      .then(json => dispatch(receivePolls(json)))
      .catch(error => {
        console.log('fetchPolls request failed', error);
      });
  };
}

function receiveUser(json) {
  console.log('receiveUser json:' + JSON.stringify(json));
  let user = (json.isAuthenticated) ? json.github.displayName : null;
  return {
    type: 'RECEIVE_USER',
    user: user
  };
}

function asyncGetUser() {
  return dispatch => {
    return fetch('/auth/user', { credentials : 'same-origin' })
      .then(checkStatus)
      .then(parseJSON)
      .then(json => dispatch(receiveUser(json)))
      .catch(error => {
        console.log('asyncGetUser request failed', error);
      });
  };
}

function addPoll(title, choices, owner) {
  return {
    type: 'ADD_POLL',
    title,
    choices,
    owner
  };
}

function addVote(pollID, choiceTitle) {
  return {
    type: 'ADD_VOTE',
    pollID,
    choiceTitle
  };
}

function addChoice(pollID, choiceTitle) {
  return {
    type: 'ADD_CHOICE',
    pollID,
    choiceTitle
  };
}

function deletePoll(pollID) {
  return {
    type: 'DELETE_POLL',
    pollID
  };
}

// *** PUBLIC actions ***

export function getUser() {
  return dispatch => {
    return dispatch(asyncGetUser());
  };
}

// TODO this should probably be async, use thunks
export function logoutUser() {
  fetch('/auth/logout');
  return {
    type: 'DROP_USER'
  };
}

// async action creator for getting all polls
export function fetchPollsIfNeeded() {
  return dispatch => {
    return dispatch(fetchPolls());
  };
}

// async action creator for adding a vote -
// updates the store first, then updates mongodb
export function addVoteAction(pollID, choiceTitle) {
  return dispatch => {
    dispatch(addVote(pollID, choiceTitle));

    return fetch('/api/addVote/' + pollID,{
      method: 'POST',
      credentials : 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        choices: {
          title: choiceTitle
        }
      })
    })
      .then(checkStatus)
      .then(result => {
        console.log('saved: ' + JSON.stringify(result));
      })
      .catch(error => {
        console.log('addVote request failed', error);
      });

    // return $.ajax({
    //   method: 'POST',
    //   url: '/api/addVote/' + pollID,
    //   contentType: 'application/json',
    //   data: JSON.stringify({
    //     choices: {
    //       title: choiceTitle
    //     }
    //   })
    // })
    // .done(function(result) {
    //   console.log('saved: ' + JSON.stringify(result));
    // })
    //   .fail(function(err) {
    //     console.log(err);
    //   });
  };
}

// async action creator for adding a poll -
// updates store first, then updates mongodb
export function addPollAction(title, choices, owner) {
  owner = owner || 'anonymous';

  var arrayChoices = [];
  choices.split(',').forEach( function (el) {
    arrayChoices.push({
      title: el.trim(),
      votes: 0
    });
  });

  return dispatch => {
    dispatch(addPoll(title, choices, owner));

    return $.ajax({
      method: 'POST',
      url: '/api/addPoll',
      contentType: 'application/json',
      data: JSON.stringify({
        poll: {
          title,
          choices: arrayChoices,
          owner
        }
      })
    }).done(function(result) {
      console.log('saved: ' + JSON.stringify(result));
    })
      .fail(function(err) {
        console.log(err);
      });
  };
}

// async action creator for adding a choice -
// updates the store first, then updates mongodb
export function addChoiceAction(pollID, choiceTitle) {
  return dispatch => {
    dispatch(addChoice(pollID, choiceTitle));

    return $.ajax({
      method: 'POST',
      url: '/api/addChoice/' + pollID,
      contentType: 'application/json',
      data: JSON.stringify({
        choices: {
          title: choiceTitle
        }
      })
    }).done(function(result) {
      console.log('saved: ' + JSON.stringify(result));
    })
      .fail(function(err) {
        console.log(err);
      });
  };
}



// async action creator for deleting a poll -
// updates store first, then updates mongodb
export function deletePollAction(pollID) {

  return dispatch => {
    dispatch(deletePoll(pollID));

    return $.ajax({
      method: 'DELETE',
      url: '/api/deletePoll/' + pollID
    }).done(function(result) {
      console.log(JSON.stringify(result));
    })
      .fail(function(err) {
        console.log(err);
      });
  };
}
