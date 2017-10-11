require('dotenv').config();

const jwt = require('jsonwebtoken');

// Middleware to protect the following API access
module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400)
    .send({ message: 'Unauthorized: No access token provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401)
      .send({ message: 'Authentication failed. Invalid access token' });
    }
    // If valid, save request for use on all routes
    req.decoded = decoded;
    next();
  });
};
