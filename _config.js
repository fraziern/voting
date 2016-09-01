var config = {};

var mongoURIProd = process.env.MONGODB_URI;
var mongoURITest = 'mongodb://localhost/test';

config.mongoURI = {
  production: mongoURIProd,
  development: mongoURITest,
  test: mongoURITest
};

module.exports = config;
