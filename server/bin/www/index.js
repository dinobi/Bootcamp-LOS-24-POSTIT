// This will be our application entry. We'll setup our server here.
require('dotenv').config();
const http = require('http');
const app = require('../../app'); // The created express app

const port = parseInt(process.env.PORT, 10) || 5000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
