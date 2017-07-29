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

// Default catch-all route that sends a message on all PostIt hit.
app.all('/', (req, res) => res.status(200).send({
  message: 'This is PostIT, Make the right Api call to start enjoying!',
}));

// Default catch-all route that sends an error message on all incorrect req.
app.all('api/*', (req, res) => res.status(404).send({
  message: 'Resource not found. Make the right Api call to start enjoying!',
}));

// Default catch-all route that sends a success message on all req.
routes(app);

module.exports = app;
