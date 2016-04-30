process.env.NODE_ENV = 'test';

var express = require('express');
// var mongoose = require('mongoose');
// require('dotenv').config();
var app = express();

// mongoose.connect(process.env.MONGODB_URI, function (err) {
//   if (err) {
//     console.log('Error connecting to the database. ' + err);
//   } else {
//     console.log('Connected to Database: ' + process.env.MONGODB_URI);
//   }
// });

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
  console.log('Request: [GET]', req.originalUrl);
  res.sendFile(__dirname+'/views/main.html');
});

// app.get('/poll',function(req,res){
//   res.sendFile(__dirname+'/views/poll.html');
// });

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
