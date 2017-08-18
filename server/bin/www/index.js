// This will be our application entry. We'll setup our server here.
const http = require('http');
const app = require('../../../app'); // The created express app

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);

if (process.env.NODE_ENV === 'production') {
  const webpack = require.resolve('webpack');
  const config = require.resolve('../../../webpack.prod.config.js');
  app.use(webpack(config));
}

server.listen(port);
