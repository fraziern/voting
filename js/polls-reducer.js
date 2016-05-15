// var lil = require('lil-uuid');
var Immutable = require('immutable');

const defaultPolls = Immutable.fromJS({
  polls: []
});

function polls(state = defaultPolls, action) {
  switch (action.type) {
    case 'ADD_VOTE':
      // action.id: id of poll to update
      // action.title: title of choice to update
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

    case 'REQUEST_POLLS':
      return state.set('isFetching', true);

    case 'RECEIVE_POLLS':
      var newState = state.set('isFetching', false);
      return newState.set('polls', Immutable.fromJS(action.polls));

    default:
      return state;
  }
}

module.exports = polls;
