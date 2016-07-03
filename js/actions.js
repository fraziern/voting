import fetch from 'isomorphic-fetch';
import $ from 'jquery';

// this defines the actions available

// TODO need to have a better response for successful async actions
// TODO Passport integration with owners

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
      .then(response => response.json())
      .then(json => dispatch(receivePolls(json)));
  };
}

function receiveUser(json) {
  return {
    type: 'RECEIVE_USER',
    user: json.github.displayName
  };
}

function asyncGetUser() {
  return dispatch => {
    return fetch('/auth/user', { credentials : 'same-origin' })
      .then(response => response.json())
      .then(json => dispatch(receiveUser(json)));
  };
}

// *** PUBLIC actions ***

export function getUser() {
  return dispatch => {
    return dispatch(asyncGetUser());
  };
}

export function logoutUser() {
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

function addVote(pollID, choiceTitle) {
  return {
    type: 'ADD_VOTE',
    pollID,
    choiceTitle
  };
}

// async action creator for adding a vote -
// updates the store first, then updates mongodb
export function addVoteAction(pollID, choiceTitle) {
  return dispatch => {
    dispatch(addVote(pollID, choiceTitle));

    return $.post('/api/addVote',
      {
        pollID,
        choiceTitle
      }
    ).done(function(result) {
      console.log('saved: ' + JSON.stringify(result));
    })
      .fail(function(err) {
        console.log(err);
      });
  };
}

export function addPoll(title, choices) {
  return {
    type: 'ADD_POLL',
    title,
    choices
  };
}

// async action creator for adding a poll -
// updates store first, then updates mongodb
export function addPollAction(title, choices) {
  var owner = 'Anonymous';  // not using owners yet

  var arrayChoices = [];
  choices.split(',').forEach( function (el) {
    arrayChoices.push({
      title: el.trim(),
      votes: 0
    });
  });

  return dispatch => {
    dispatch(addPoll(title, choices));

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
