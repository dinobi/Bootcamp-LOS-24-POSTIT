import express from 'express';
import logger from 'morgan';
import favicon from 'serve-favicon';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import bodyParser from 'body-parser';
import routes from './server/routes';
import config from './webpack.config';

const path = require('path');

// Set express app
const app = express();

// Log all requests to the console
app.use(logger('dev'));
const env = process.env.NODE_ENV || 'development';
const compiler = webpack(config);

if (env === 'development') {
  app.use(webpackMiddleware(compiler, {
    noInfo: true,
    hot: true,
    publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

// Parse requests via middleware (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve favicon
app.use(favicon(path.join(__dirname, '/client', 'favicon.ico')))

// Serve index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

// Default catch-all route that sends an error message on all incorrect req.
app.all('api/*', (req, res) => res.status(404).send({
  message: 'Resource not found.!',
}));

// Default catch-all route that sends a success message on all req.
routes(app);

module.exports = app;
