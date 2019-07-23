const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const dotenv = require('dotenv');

dotenv.config();
const entryPath = path.resolve(__dirname, 'client/src/app/index.jsx');
const vendorPath = path.resolve(__dirname, 'client/src/vendor');
const outputPath = path.resolve(__dirname, 'client/dist');
const prodMode = process.env.NODE_ENV === 'production';

module.exports = {
  entry: { main: entryPath, vendor: vendorPath },
  target: 'web',
  plugins: [
    /*
    extract css from bundle into a separate file, and add
    support for cache busting.
    */
    new MiniCssExtractPlugin({
      filename: 'faviewer.[name].[contentHash].css'
    }),
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'React Client',
      filename: 'index.html',
      template: 'client/index.html',
      inject: true,
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
      },
      hash: true,
      cache: true
    }),
  ],
  output: {
    // In development, physical bundle file won't be written,
    // but will be bundled in-memory and simulated.
    filename: prodMode ?
      'faviewer.[name].[chunkhash].bundle.min.js' : 'faviewer.[name].bundle.js',
    path: outputPath,
    publicPath: '/'
  },
  module: {
    rules: [
      // ** ADDING/UPDATING LOADERS **
      // The "file" loader handles all assets unless explicitly excluded.
      // The `exclude` list *must* be updated with every change
      // to loader extensions.
      // When adding a new loader, you must add its `test`
      // as a new entry in the `exclude` list for "file" loader.

      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `dist` folder.
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
          /\.svg$/,
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
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
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
        test: /\.(sc|sa|c)ss$/,
        use: [
          !prodMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // Having trouble with urls not resolving?, add this setting.
              // See https://github.com/webpack-contrib/css-loader#url
              url: false,
              minimize: true,
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // add sourcemap
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer],
            },
          }
        ]
      },
    ]
  },
};
