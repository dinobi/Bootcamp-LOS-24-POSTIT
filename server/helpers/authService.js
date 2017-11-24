import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'PrivateKey';
/**
* generateAuthToken middleware
* Generates an jwt authentication token for a user
*
* @returns {string} token for user verification
* @param  {object} user - user object parameter
*/
const generateAuthToken = (user) => {
  const token = jwt.sign({
    data: user
  }, jwtSecret, { expiresIn: process.env.JWT_EXPIRY_TIME });
  return token;
};
/**
* authUser middleware
* Recieves and verifies a jwt authentication token in order
* to grant user access to protected resources
*
* @param  {object} req - request object parameter
* @param  {object} res - response object paramter
* @param  {object} next - response object paramter
* @return {function} next() - calls the next middleware
*/
const authUser = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401)
    .send({ error: { message: 'Unauthorized: No access token provided' } });
  }
  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      return res.status(401)
      .send({
        error: { message: 'Authentication failed. Invalid access token' }
      });
    }
    // If valid, save request for use on all routes
    req.decoded = decoded;
    next();
  });
};

export { authUser, generateAuthToken };
