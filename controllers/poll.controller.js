var Poll = require('../models/poll');
// var lil = require('lil-uuid');

var PollController = function() {
  function getPolls(req, res) {
    Poll.find()
      .select('id owner title choices')
      .exec(function(err, polls) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ polls });
    });
  }

  function addPoll(req, res) {
    if (!req.body.poll.title || !req.body.poll.owner) {
      return res.status(403).end();
    }

    var newPoll = new Poll(req.body.poll);
        // Let's sanitize inputs
        // newPost.title = sanitizeHtml(newPost.title);
        // newPost.name = sanitizeHtml(newPost.name);
        // newPost.content = sanitizeHtml(newPost.content);
        //
        // newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });

    newPoll.save( function(err, saved) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json({ poll: saved });
    });
  }

  return {
    getPolls: getPolls,
    addPoll:  addPoll
  };
}();

module.exports = PollController;
