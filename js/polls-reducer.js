// var lil = require('lil-uuid');
var Immutable = require('immutable');

// const defaultPolls = Immutable.fromJS({
//   isFetching: false,
//   polls: [{
//     id: lil.uuid(),
//     title: 'Question 1',
//     choices: [{
//       title: 'Choice 1',
//       votes: 2
//     }, {
//       title: 'Choice 2',
//       votes: 1
//     }, {
//       title: 'Choice 3',
//       votes: 5
//     }],
//     owner: 'blerg'
//   }, {
//     id: lil.uuid(),
//     title: 'Question 2',
//     choices: [{
//       title: 'Choice 1',
//       votes: 5
//     }, {
//       title: 'Choice 2',
//       votes: 5
//     }, {
//       title: 'Choice 3',
//       votes: 10
//     }],
//     owner: 'blerg'
//   }]
// });

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
      pollIndex = state.polls.findKey(function(el) {
        return (el.get('id') === action.id);
      });
      choiceIndex = state.polls.getIn([pollIndex, 'choices']).findKey(function(el) {
        return (el.get('title') === action.title);
      });

      return state.polls.updateIn([pollIndex, 'choices', choiceIndex, 'votes'], 1,
        v => v + 1);

    case 'REQUEST_POLLS':
      return state.set('isFetching', true);

    case 'RECEIVE_POLLS':
      var newState = state.set('isFetching', false);
      return newState.set('polls', action.polls);

    default:
      return state;
  }
}

module.exports = polls;
