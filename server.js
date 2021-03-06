// env vers and related config vars
// TODO: add NODE_ENV=test to .env and remove from package.json script
require('dotenv').config({silent:true});
var config = require('./_config');

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
var cookieSession = require('cookie-session');
require('./js/config/passport.js')(passport);

// additional routes
var api = require('./routes/api.routes');
var auth = require('./routes/auth.routes');

var app = express();

console.log('NODE_ENV set to ' + app.settings.env);

mongoose.connect(config.mongoURI[app.settings.env], function (err) {
  if (err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});

// seed database with some test data if it's empty
var dummyData = require('./dummyData');
dummyData();

// app.use(session({
//   secret: 'secretVoting',
//   resave: false,
//   saveUninitialized: false
// }));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api',  api);
app.use('/auth', auth);

app.get('*', function(req, res){
  console.log('Request: [GET]', req.originalUrl);
  res.sendFile(__dirname+'/views/main.html');
});

/**
 * Error Handling
 */

app.use(function(req, res, next) {
  console.log('404');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.sendStatus(err.status || 500);
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
  console.log('Node.js listening on port ' + port + '...');
});
