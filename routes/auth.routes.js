// var AuthController = require('../controllers/auth.controller');
var express = require('express');
const passport = require('passport');
var Router = express.Router;

var router = new Router();

// auth/github
router.route('/github').get(passport.authenticate('github'));

// auth/github/callback
router.route('/github/callback')
  .get(passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

router.route('/user').get((req, res) => {
    console.info('user: ', req.user);
    return res.json(req.user);
  });


module.exports = router;
