import jwt from 'jsonwebtoken';
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
        'Bad request, one or more field already exists or violates allowed input' });
      });
  },
  fetch(req, res) {
    return models.User
      .findAll()
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },
  auth(req, res) {
    models.User
      .findAll({ where: { username: [req.body.username],
        password: [req.body.password] } })
      .then((user) => {
        if (user[0]) {
          res.status(202).send({
            message: 'Authentication succesful'
          });
        } else {
          res.status(404).send({ message: 'User has no account on PostIt'
          });
        }
      });
  }
};
