import fetch from 'isomorphic-fetch';

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

export default function fetchPollsIfNeeded() {
  return dispatch => {
    return dispatch(fetchPolls());
  };
}
