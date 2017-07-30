const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['./client/src/app.js',
    'webpack-dev-server/client?http://localhost:8080'],
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
      },
      {
        test: /\.scss$/,
        loader: '!style-loader!scss-loader!autoprefixer-loader!css-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
        ]
      },
    ]
  },
  devServer: {
    contentBase: './client/src'
  },
};
