process.env.NODE_ENV = 'test';

var express = require('express');
var mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
require('dotenv').load();
require('./js/config/passport.js')(passport);

// additional routes
var api = require('./routes/api.routes');
var auth = require('./routes/auth.routes');

var dummyData = require('./dummyData');
var bodyParser = require('body-parser');

dummyData();

require('dotenv').config();
var app = express();

mongoose.connect('mongodb://localhost/test', function (err) {
  if (err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + 'mongodb://localhost/test');
  }
});

app.use(session({
  secret: 'secretVoting',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api',  api);
app.use('/auth', auth);
app.use(express.static(__dirname + '/public'));

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
