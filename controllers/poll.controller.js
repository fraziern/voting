var Poll = require('../models/poll');

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

  function addVote(req, res) {
    if (!req.params.id || !req.body.choices) {
      return res.status(403).json(req.body).end();
    }

    var pollID = req.params.id;
    var choiceTitle = req.body.choices.title;

    var query = {_id: pollID, 'choices.title': choiceTitle};
    var update = { $inc: {'choices.$.votes': 1}};

    Poll.update(query, update, function (err, saved) {
      if (err) return res.status(500).send(err);
      return res.json({poll: saved});
    });

  }

  function addChoice(req, res) {
    if (!req.body.choices || !req.params.id) {
      return res.status(403).json(req.body).end();
    }

    var pollID = req.params.id;
    var query = {_id: pollID};
    Poll.findByIdAndUpdate(
        pollID,
        {$push: {'choices': {'title': req.body.choices.title, 'votes': 0}}},
        {safe: true, new : true},
        function(err, saved) {
          if (err) return res.status(500).send(err);
          return res.json({poll: saved});
        }
    );
  }

  function deletePoll(req, res) {
    if (!req.params.id) {
      return res.status(403).json({id: pollID}).end();
    }

    var pollID = req.params.id;
    Poll.findByIdAndRemove(pollID, function (err){
      if (err) return res.status(500).send(err);
      return res.json({removed: pollID});
    });
  }

  return {
    getPolls: getPolls,
    addPoll:  addPoll,
    addVote:  addVote,
    addChoice: addChoice,
    deletePoll
  };
}();

module.exports = PollController;
