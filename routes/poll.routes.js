var PollController = require('../controllers/poll.controller');
var express = require('express');
var Router = express.Router;

var router = new Router();

// Get all Polls
router.route('/getPolls').get(PollController.getPolls);

// Add a new Poll
router.route('/addPoll').post(PollController.addPoll);

// Get one post by title
// router.route('/getPost').get(PostController.getPost);

// Delete a Post
// router.route('/deletePost').post(PostController.deletePost);

module.exports = router;
