const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['./client/dev/app.js',
    'webpack-dev-server/client?http://localhost:8000'],
  output: { path: `${__dirname}/client/dist/`,
    filename: 'bundle.min.js',
    publicPath: '/dist/' },
  devtool: debug ? 'source-map' : true,
  watch: true,

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
