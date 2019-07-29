/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import logger from 'morgan';
import open from 'open';
import chalk from 'chalk';
import favicon from 'serve-favicon';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import bodyParser from 'body-parser';
import routes from './routes';
import config from '../webpack.config.dev';


dotenv.config();
const env = process.env.NODE_ENV;
const portNum = env === 'production' ? 5000 : 3001;
const port = parseInt(process.env.PORT, 10) || portNum;


// Set express app
const app = express();

// Log all requests to the console
app.use(logger('dev'));
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
app.use('/api-docs',
express.static(path.join(__dirname, './api-docs')));

// serve favicon
app.use(favicon(path.join(__dirname, '../client', 'favicon.ico')));

// Serve index page on client
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
// Serve index page on dist
app.get('/dist/*', (req, res) => {
  res.sendFile(path.join(__dirname, `../client/${req.originalUrl}`));
});

// Default catch-all route that sends an error message on all incorrect req.
app.all('api/*', (req, res) => res.status(404).send({
  message: 'Resource not found.!',
}));

// Routes function that recieves app as argument to define our endpoint.
routes(app);

// Tell app to listen and serve requests on specified port
app.listen(port, () => {
  console.log(chalk.green(`postit is on port ${port}`));
  open(`http://localhost:${port}`);
});
