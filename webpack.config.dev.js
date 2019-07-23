/* eslint-disable import/extensions */
const webpack = require('webpack');
const merge = require('webpack-merge');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const commonConfig = require('./webpack.config.common.js');

const port = process.env.PORT || 3004;
const host = process.env.host || '0.0.0.0';

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    contentBase: './src',
    historyApiFallback: true,
    port,
    watchContentBase: true,
    hot: true,
    quiet: true,
    open: true,
  },
  plugins: [
    // Access environment variables inside react components
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    new CaseSensitivePathsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
    }
  },
});
