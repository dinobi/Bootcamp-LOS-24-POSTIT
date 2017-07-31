const debug = process.env.NODE_ENV !== 'production';
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['./client/src/app.js',
    'webpack-dev-server/client?http://localhost:8080'],
  output: { path: `${__dirname}/client/public/`,
    filename: 'bundle.min.js',
    publicPath: '/' },
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
        loader: '!style-loader!autoprefixer-loader!scss-loader!css-loader'
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
  resolve: {
    plugins: [
      // Prevents users from importing files from
      // outside of src/ (or node_modules/).
      // This often causes confusion because we only
      // process files within src/ with babel.
      // To fix this, we prevent you from importing files out of
      // src/ -- if you'd like to, please link the files into your
      // node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they
      // will not be processed in any way.
      new ModuleScopePlugin(path.appSrc),
    ],
  },
  devServer: {
    contentBase: './client/src'
  },
};
