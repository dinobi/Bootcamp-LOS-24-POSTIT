import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes';

// Set express app
const app = express();

// Log all requests to the console
app.use(logger('dev'));

// Parse requests via middleware (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Default catch-all route that sends back a success message on all req.
routes(app);

// Default catch-all route that sends back an error message on get req.
app.get('api/*', (req, res) => res.status(404).send({
  message: 'Resource not found. Make the right Api call to start enjoying!',
}));

// Default catch-all route that sends back an error message on post req.
app.post('api/*', (req, res) => res.status(404).send({
  message: 'Resource not found. Make the right Api call to start enjoying!',
}));

module.exports = app;
