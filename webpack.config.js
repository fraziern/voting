var config = {
  debug: true,
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
