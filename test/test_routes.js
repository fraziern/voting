var request = require('supertest')
   , should = require('should')
   , express = require('express');

describe('Routing', function() {
  var url = 'http://localhost:8080';
  var newId = '';

  before(function(done) {
    var newPollBody = {
      "poll":
      {
        "title": "blah",
        "choices": [{
            "title": "blah",
            "votes": 0
        }],
        "owner": "blerg"
      }
    };
    request(url)
      .post('/api/addPoll')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(newPollBody))
      .end(function(err, res) {
        if (err) return done(err);
        newId = res.body.poll._id;
        done();
      });
  });

  describe('Delete poll', function() {
    it('should return status 200 when trying to delete a valid poll', function(done) {
      request(url)
        .delete('/api/deletePoll/' + newId)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
});
