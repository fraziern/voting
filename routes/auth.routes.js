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

// TODO this is a bit of a mess, added isAuthenticated to handle null
//  cases. But then had to assign the github value directly, which won't scale
//  if we add other authentication methods. Need a way to tell if req.user is
//  undefined, and pass that in. Or maybe use req.isAuthenticated?

router.route('/user').get((req, res) => {
  var user = {};
  console.log('User: ' + req.user);
  if (req.user) {
    // console.log('here');
    user.github = Object.assign(req.user.github);
    user.isAuthenticated = true;
  } else {
    user.isAuthenticated = false;
  }
  return res.json(user);
});

// TODO: signout button then refresh home = signs you back in again

router.route('/logout').get(function(req, res){
  res.clearCookie('connect.sid');
  req.session.destroy(function(err) {
    console.log('User: ' + req.user);
    res.redirect('/');
  });
});

module.exports = router;
