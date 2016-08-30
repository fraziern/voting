require('dotenv').config();

var config = {};

var mongoURIDev = process.env.MONGODB_URI;
var mongoURITest = 'mongodb://localhost/test';

config.mongoURI = {
  development: mongoURIDev,
  test: mongoURITest
};

config.prefixURL = {
  development: 'http://slightly-shorter.herokuapp.com/',
  test: 'http://localhost:8080/'
};

module.exports = config;
