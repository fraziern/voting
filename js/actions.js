import fetch from 'isomorphic-fetch';
import $ from 'jquery';

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
