var PollController = require('../controllers/poll.controller');

var express = require('express');
var Router = express.Router;

var router = new Router();

// Get all Polls
router.route('/getPolls').get(PollController.getPolls);

// Add a new Poll
router.route('/addPoll').post(PollController.addPoll);

// Add a vote to an existing poll and choice
router.route('/addVote').post(PollController.addVote);

// Delete a poll
router.route('/deletePoll/:id').delete(PollController.deletePoll);

module.exports = router;
