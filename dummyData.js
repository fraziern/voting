var Poll = require('./models/poll');

module.exports = function () {
  Poll.count().exec( function(err, count) {
    if (count > 0) {
      return;
    }

    var defaultPoll1 = new Poll({
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
    });

    var defaultPoll2 = new Poll({
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
    });

    Poll.create([defaultPoll1, defaultPoll2], (error) => {
      if (!error) {
        console.log('ready to go...');
      }
    });
  });
};
