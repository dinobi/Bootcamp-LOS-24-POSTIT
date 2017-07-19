import jwt from 'jsonwebtoken';
import md5 from 'md5';
import models from '../models';

export default {
  create(req, res) {
    return models.User
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
      })
      .then(user => res.status(201).send(user))
      .catch((error) => {
        console.log(error);
        res.status(400).send({ message:
        'Bad request, one or more field' +
        ' already exists or violates allowed input' });
      });
  },
  fetch(req, res) {
    return models.User
      .findAll()
      .then(user => res.status(200).send(user))
      .catch((error) => {
        console.log(error);
        res.status(400).send({
          message: 'Bad request, check for correct API call'
        });
      });
  },
  auth(req, res) {
    models.User
      .findOne({ where: { username: req.body.username,
        password: req.body.password } })
      .then((user) => {
        if (!user) {
          res.status(404).send({
            message: 'Authentication failed. Username or password incorrect'
          });
        } else if (user) {
          // check if password matches
          if (user.password !== req.body.password) {
            res.status(404).send({
              message: 'Authentication failed. Incorrect password' });
          } else {
            // User is found and password is correct
            // create a token
            const token = jwt.sign({ data: user }, 'PrivateKey', {
              expiresIn: '4h' // expires in 4 hours
            });
            // return the information including token in JSON format
            res.status(200).send({
              message: 'Authentication successful', authToken: token
            });
            res.status(400).send({ message: 'Bad request' });
          }
        }
      });
  }
};
