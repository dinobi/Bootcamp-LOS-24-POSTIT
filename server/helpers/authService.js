import jwt from 'jsonwebtoken';

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const generateAuthToken = (user) => {
  const token = jwt.sign({
    data: user
  }, jwtSecret, { expiresIn: process.env.JWT_EXPIRY_TIME });
  return token;
};
export default generateAuthToken;
