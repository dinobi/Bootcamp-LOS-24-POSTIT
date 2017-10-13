import jwt from 'jsonwebtoken';

require('dotenv').config();

const jwtSecret = process.env.JWT_TOKEN || 'PrivateKey';
const generateAuthToken = (user) => {
  const token = jwt.sign({
    data: user
  }, jwtSecret, { expiresIn: '24h' });
  return token;
};
export default generateAuthToken;
