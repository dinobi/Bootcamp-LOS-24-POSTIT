const path = require('path');
const webpack = require('webpack');

const port = process.env.PORT || 3001;
const outputPath = `${__dirname}/client/dist`;

module.exports = {
  devServer: {
    inline: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    port,
    compress: true,
    hot: true,
    quiet: true,
  },
  devtool: 'cheap-source-map',
  entry: './client/src/app/index.jsx',
  output: {
    path: outputPath,
    filename: 'bundle.min.js',
    publicPath: '/dist/'
  },
  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      // ** ADDING/UPDATING LOADERS **
      // The "file" loader handles all assets unless explicitly excluded.
      // The `exclude` list *must* be updated with every change
      // to loader extensions.
      // When adding a new loader, you must add its `test`
      // as a new entry in the `exclude` list for "file" loader.

      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `build` folder.
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.scss$/,
          /\.sass$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: 'bundle.[ext]',
        },
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'bundle.[ext]',
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      { test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      compress: {
        screw_ie8: true,
        warnings: false
      },
      output: {
        comments: false,
        screw_ie8: true
      },
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':
      JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer'
    }),
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};
