var config = {};

var mongoURIProd = process.env.MONGODB_URI;
var mongoURITest = 'mongodb://localhost/test';

config.mongoURI = {
  production: mongoURIProd,
  test: mongoURITest
};

module.exports = config;
