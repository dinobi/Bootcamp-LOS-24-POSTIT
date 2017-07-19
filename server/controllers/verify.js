import jwt from 'jsonwebtoken';
import models from '../models';

let token;
export default {
  function((req, res, next) => {
    token = req.headers['x-access-token'];
    jwt.verify(token, 'PrivateKey', (err, decoded) =>{
      if(err){
        res.status(401).send({ message: 'User not authenticated. Invalid access token'});
        return;
      }
      // If valid, save request for use on all routes
      req.decoded = decoded;
      next();
    });
  })

};
