var lil = require('lil-uuid');
var Immutable = require('immutable');

const defaultPolls = Immutable.fromJS([{
  id: lil.uuid(),
  title: 'Question 1',
  choices: [{
    title: 'Choice 1',
    votes: 2
  }, {
    title: 'Choice 2',
    votes: 1
  }, {
    title: 'Choice 3',
    votes: 5
  }],
  owner: 'blerg'
}, {
  id: lil.uuid(),
  title: 'Question 2',
  choices: [{
    title: 'Choice 1',
    votes: 5
  }, {
    title: 'Choice 2',
    votes: 5
  }, {
    title: 'Choice 3',
    votes: 10
  }],
  owner: 'blerg'
}]);


function polls(state = defaultPolls, action) {
  switch (action.type) {
    case 'ADD_VOTE':
      // action.id: id of poll to update
      // action.title: title of choice to update

      var pollIndex = 0;
      var choiceIndex = 0;
      pollIndex = state.findKey(function(el) {
        return (el.get('id') === action.id);
      });
      choiceIndex = state.getIn([pollIndex, 'choices']).findKey(function(el) {
        return (el.get('title') === action.title);
      });

      return state.updateIn([pollIndex, 'choices', choiceIndex, 'votes'], 1,
        v => v + 1);

    default:
      return state;
  }
}

module.exports = polls;
