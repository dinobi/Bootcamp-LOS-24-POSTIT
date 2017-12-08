// This will be our application entry. We'll setup our server here.
import http from 'http';
import dotenv from 'dotenv';
import app from '../../app'; // The created express app

dotenv.config();
const env = process.env.NODE_ENV;

const portNum = env === 'production' ? 5000 :
3001;
const port = parseInt(process.env.PORT, 10) || portNum;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`TIA is on port ${port}`);
});
