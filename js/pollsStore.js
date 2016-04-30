var dispatcher = require('./dispatcher');
var lil = require('lil-uuid');

function PollsStore() {
  var listeners = [];
  var polls = [{
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

  function getPolls() {
    return polls;
  }

  function onChange(listener) {
    listeners.push(listener);
  }

  function addPoll(poll) {
    polls.push(poll);
    triggerListeners();
  }

  function updateVote(id, choice) {
    polls = polls.map(function(poll) {
      if (poll.id === id) {
        poll.choices = poll.choices.map(function(el) {
          if (el.title === choice) {
            el.votes++;
          }
          return el;
        });
      }
      return poll;
    });
    triggerListeners();
  }

  function triggerListeners() {
    listeners.forEach(function(listener) {
      listener(polls);
    });
  }

  dispatcher.register(function(payload) {
    var split = payload.type.split(':');
    if (split[0] === 'choice') {
      switch (split[1]) {
        case 'updateVote':
          updateVote(payload.id, payload.choice);
          break;
      }
    }
  });

  return {
    getPolls: getPolls,
    onChange: onChange,
    adPoll: addPoll,
    updateVote: updateVote
  };
}

module.exports = PollsStore();
