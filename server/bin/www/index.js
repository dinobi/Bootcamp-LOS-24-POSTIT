// This will be our application entry. We'll setup our server here.
const http = require('http');
const app = require('../../app'); // The created express app

const port = parseInt(process.env.PORT, 10) || 3001;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
