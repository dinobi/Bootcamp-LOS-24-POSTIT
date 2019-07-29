/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebPackMd5Hash = require('webpack-md5-hash');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  // minify JS files
  plugins: [
    new WebPackMd5Hash(),
    // Access environment variables inside react components
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
          mangle: true,
          ie8: true,
          compress: {},
          parse: {},
        },
      }),
    ]
  }
});
