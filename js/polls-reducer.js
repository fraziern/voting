var lil = require('lil-uuid');

const defaultPolls = [{
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
}];

function polls (state = defaultPolls, action) {
  console.log('current state: ' + JSON.stringify(state));
  switch (action.type) {
    case 'ADD_VOTE':
      return state.map(function(poll) {
        if (poll.id === action.id) {
          poll.choices = poll.choices.map(function(el) {
            if (el.title === action.choice) {
              return Object.assign({}, el, {
                votes: el.votes + 1
              });
            }
            return el;
          });
        }
        return poll;
      });
    default:
      return state;
  }
}

module.exports = polls;
