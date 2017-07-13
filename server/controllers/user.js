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
        password: req.body.password
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
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
        // create a token for user if they exist
          const token = jwt.sign({
            userData: user[0]
          }, 'PrivateKey', { expiresIn: '2h' });

          res.status(202).send({
            token,
            message: 'Authentication succesful'
          });
        } else {
          res.status(404).send({ message: 'Not found'
          });
        }
      });
  }
};
