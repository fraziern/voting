// this reducer modifies the store
var Immutable = require('immutable');

const defaultPolls = Immutable.fromJS({
  polls: [],
  authUser: null,
  isSaving: false,
  isFetching: false
});

function polls(state = defaultPolls, action) {
  switch (action.type) {
    case 'ADD_VOTE':

      var pollIndex = 0;
      var choiceIndex = 0;

      pollIndex = state.get('polls').findKey(function(el) {
        return (el.get('id') === action.pollID);
      });

      choiceIndex = state.getIn(['polls', pollIndex, 'choices']).findKey(function(el) {
        return (el.get('title') === action.choiceTitle);
      });

      return state.updateIn(['polls', pollIndex, 'choices', choiceIndex, 'votes'], 1,
        v => v + 1);

    case 'ADD_CHOICE':

      pollIndex = 0;
      pollIndex = state.get('polls').findKey(function(el) {
        return (el.get('id') === action.pollID);
      });
      var newChoice = Immutable.fromJS({title: action.choiceTitle, votes: 0});

      return state.updateIn(['polls', pollIndex, 'choices'], choices => choices.push(newChoice));

    case 'REQUEST_POLLS':
      return state.set('isFetching', true);

    case 'RECEIVE_POLLS':
      var newState = state.set('isFetching', false);
      return newState.set('polls', Immutable.fromJS(action.polls));

    case 'ADD_POLL_REQUEST':
      return state.set('isSaving', true);

    case 'ADD_POLL_FAILED':
      // error: oops
      // TODO: implement this
      return state;

    case 'ADD_POLL':
      // This is the "success" action
      // action.owner: owner
      // action.title: Title
      // action.choices: comma separated choices
      // action.id: returned from save API call
      var newPoll = {title: action.title, owner: action.owner, choices: [], id: action.id};
      action.choices.split(',').forEach( function (el) {
        newPoll.choices.push({
          title: el.trim(),
          votes: 0
        });
      });
      var newPollList = Immutable.fromJS(newPoll);
      var newState = state.set('isSaving', false);
      return newState.set('polls', state.get('polls').push(newPollList));

    case 'DELETE_POLL':

      return state.set('polls', state.get('polls').filter(function (el) {
        return (el.get('id') != action.pollID);
      }));


    // user actions
    // TODO put these in a separate reducer

    case 'RECEIVE_USER':
      return state.set('authUser', action.user);

    case 'DROP_USER':
      return state.set('authUser', null);

    default:
      return state;
  }
}

module.exports = polls;
