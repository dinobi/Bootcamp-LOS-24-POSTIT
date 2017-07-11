import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

// Set up the express app as constant
const app = express();

// Log all requests to the console
app.use(logger('dev'));

// Parse incoming requests bodies in a middleware (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Default catch-all route that sends back a success message.
app.get('*', (req, res) => res.status(200).send({
  message: "Welcome to Andela Bootcamp 24 - PostIt App.",
}));

// Default catch-all route that sends back an error message.
app.get('*', (req, res) => res.status(404).send({
  message: "The resource was not found",
}));

module.exports = app;
