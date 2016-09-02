import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

// this defines the actions available

// TODO need to have a better response for successful async actions
// TODO Passport integration with owners

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
    return fetch('/api/getPolls', { credentials : 'same-origin' })
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

function asyncLogoutUser() {
  return dispatch => {
    return fetch('/auth/logout', { credentials : 'same-origin' })
      .then(() => {
        dispatch(dropUser());
      });
  };
}

function dropUser() {
  return {
    type: 'DROP_USER'
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

export function logoutUser() {
  return dispatch => {
    return dispatch(asyncLogoutUser());
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
      .then(parseJSON)
      .then(result => {
        console.log('saved: ' + JSON.stringify(result));
      })
      .catch(error => {
        console.log('addVote request failed', error);
      });
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

    return fetch('/api/addPoll', {
      method: 'POST',
      credentials : 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        poll: {
          title,
          choices: arrayChoices,
          owner
        }
      })
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(result => {
        console.log('saved: ' + JSON.stringify(result));
      })
      .catch(error => {
        console.log('addPoll request failed', error);
      });
  };
}

// async action creator for adding a choice -
// updates the store first, then updates mongodb
export function addChoiceAction(pollID, choiceTitle) {
  return dispatch => {
    dispatch(addChoice(pollID, choiceTitle));

    return fetch('/api/addChoice/' + pollID, {
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
      .then(parseJSON)
      .then(result => {
        console.log('saved: ' + JSON.stringify(result));
      })
      .catch(error => {
        console.log('addChoice request failed', error);
      });
  };
}

// async action creator for deleting a poll -
// updates store first, then updates mongodb
export function deletePollAction(pollID) {

  return dispatch => {
    dispatch(deletePoll(pollID));

    return fetch('/api/deletePoll/' + pollID, {
      method: 'DELETE',
      credentials : 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(result => {
        console.log('saved: ' + JSON.stringify(result));
      })
      .catch(error => {
        console.log('deletePoll request failed', error);
      });
  };
}
