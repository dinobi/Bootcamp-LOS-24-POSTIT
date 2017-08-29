import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models';

const salt = bcrypt.genSaltSync(2);
export default {
  create(req, res) {
    if (req.body.firstname === '') {
      return res.status(400)
      .send({
        error: { message: 'firstname field cannot be empty' },
        userData: req.body
      });
    }
    if (req.body.lastname === '') {
      return res.status(400)
      .send({
        error: { message: 'lastname field cannot be empty' },
        userData: req.body
      });
    }

    if (req.body.username === '') {
      return res.status(400)
      .send({
        error: { message: 'username field cannot be empty' },
        userData: req.body
      });
    }

    if (req.body.email === '') {
      return res.status(400)
      .send({
        error: { message: 'email field cannot be empty' },
        userData: req.body
      });
    }

    if (req.body.password === '') {
      return res.status(400)
      .send({
        error: { message: 'password field cannot be empty' },
        userData: req.body
      });
    }

    if (req.body.phone === '') {
      return res.status(400)
      .send({
        error: { message: 'phone field cannot be empty' },
        userData: req.body
      });
    }
    return models.User
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt, null),
        phone: req.body.phone
      })
      .then(user => res.status(201)
      .send({ message: 'User account successfully created.', userData: user }))
      .catch((error) => {
        console.log(error);
        res.status(400).send({ message:
        'Bad request, one or more field' +
        ' already exists or violates allowed input' });
      });
  },
  fetch(req, res) {
    return models.User
      .findAll({ attributes:
        ['id', 'firstname', 'lastname', 'username', 'email', 'phone', 'createdAt', 'updatedAt']
      })
      .then(users => res.status(200).send(users))
      .catch((error) => {
        console.log(error);
        res.status(400).send({
          error: { message: 'Bad request, check for correct API call' }
        });
      });
  },
  auth(req, res) {
    models.User
      .findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          res.status(404).send({
            message: 'Authentication failed. Username is incorrect'
          });
        } else if (user) {
          // check if password matches
          if (!(bcrypt.compareSync(req.body.password, user.password))) {
            res.status(404).send({
              message: 'Authentication failed. Incorrect password' });
          } else {
            // User is found and password is correct
            // create a token
            const token = jwt.sign({ data: user }, 'PrivateKey', {
              expiresIn: '24h' // expires in 24 hours
            });
            // return success message including token in JSON format
            res.status(200).send({
              message: 'Authentication successful', authToken: token
            });
            res.status(400)
            .send({ message: 'Bad request. Account does not exist on postit' });
          }
        }
      });
  }
};
