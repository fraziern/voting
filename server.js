process.env.NODE_ENV = 'test';

var express = require('express');
var mongoose = require('mongoose');
require('dotenv').config();
var app = express();

mongoose.connect(process.env.MONGODB_URI, function (err) {
  if (err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + process.env.MONGODB_URI);
  }
});

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8080;
app.listen(port,  function () {
  console.log('Node.js listening on port ' + port + '...');
});
