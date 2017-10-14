import jwt from 'jsonwebtoken';

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'PrivateKey';

const generateAuthToken = (user) => {
  const token = jwt.sign({
    data: user
  }, jwtSecret, { expiresIn: process.env.JWT_EXPIRY_TIME });
  return token;
};

const authUser = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400)
    .send({ message: 'Unauthorized: No access token provided' });
  }
  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      return res.status(401)
      .send({ message: 'Authentication failed. Invalid access token' });
    }
    // If valid, save request for use on all routes
    req.decoded = decoded;
    next();
  });
};

export { authUser, generateAuthToken };
