var webpack = require('webpack');

var config = {
  debug: true,
  entry: {
    main: './js/main.js'
  },
  output: {
    filename: 'public/[name].bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
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
