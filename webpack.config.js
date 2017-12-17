const webpack = require('webpack');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = {
  devServer: {
    inline: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    contentBase: './client',
    port: 3001,
    watchContentBase: true,
    hot: true,
    quiet: true,
  },
  devtool: 'inline-source-map',
  entry: [require.resolve('webpack-hot-middleware/client'),
    path.join(__dirname, '/client/src/app/index.jsx')
  ],
  resolve: {
    modules: ['node_modules', './client/src'],
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
  output: {
    path: `${__dirname}/client/dist`,
    filename: 'bundle.min.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer'
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        APP_URL: JSON.stringify(process.env.APP_URL),
        JWT_EXPIRY_TIME: JSON.stringify(process.env.JWT_EXPIRY_TIME)
      }
    }),
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    new CaseSensitivePathsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new ModuleScopePlugin('client/src'),
  ],
};

