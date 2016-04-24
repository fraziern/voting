var path = require('path');
var webpack = require('webpack');

// var BUILD_DIR = path.resolve(__dirname, 'public');
// var APP_DIR = path.resolve(__dirname, 'app');

var config = {
  entry: {
    main: './js/main.js'
  },
  output: {
    filename: 'public/[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: 'node_modules',
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
};

module.exports = config;
