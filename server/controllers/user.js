import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import models from '../models';
import { generateAuthToken } from '../helpers/authService';
import { loginValidator, signupValidator, responseErrorValidator } from '../helpers/inputValidator';

const salt = bcrypt.genSaltSync(8);
export default {
  // A visitor can create a new account
  createNewUser(req, res) {
    if (signupValidator(req, res) !== 'validated') {
      return;
    }
    return models.User
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username.trim().toLowerCase(),
        email: req.body.email.trim().toLowerCase(),
        password: bcrypt.hashSync(req.body.password, salt, null),
        phone: req.body.phone
      })
      .then(user => res.status(201)
      .send({
        message: 'User account successfully created.',
        userData: {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          phone: user.phone
        }
      }))
      .catch((error) => {
        if (responseErrorValidator(res, error) !== 'validated') {
          return;
        }
      });
  },
  // A user can login into thier account
  authUser(req, res) {
    if (loginValidator(req, res) !== 'validated') {
      return;
    }
    const data = req.body.username;
    // check if user is login in with email and resolve accordingly
    if (data.match(/@/) !== null) {
      return models.User
      .findOne({ where: { email: data } })
      .then((user) => {
        if (!user) {
          res.status(404).send({
            error: { message: 'Authentication failed. Email is incorrect or does not exist' }
          });
        } else if (user) {
          // check if password matches
          if (!(bcrypt.compareSync(req.body.password, user.password))) {
            res.status(404).send({
              error: { message: 'Authentication failed. Incorrect password' } });
          } else {
            // User is found--password is correct--generate token
            const token = generateAuthToken(user);
            // return success message including token in JSON format
            res.status(200).send({
              message: 'Authentication successful',
              userData:
              {
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                phone: user.phone,
              },
              authToken: token
            });
          }
        }
      }).catch(error => res.status(500).send({ error: error.message, status: 500 }));
    }
    // Else user uses his username
    return models.User
      .findOne({ where: { username: data } })
      .then((user) => {
        if (!user) {
          res.status(404).send({ error:
            { message: 'Authentication failed. Username is incorrect or does not exist' }
          });
        } else if (user) {
          // check if password matches
          if (!(bcrypt.compareSync(req.body.password, user.password))) {
            res.status(404).send({ error:
              { message: 'Authentication failed. Incorrect password' }
            });
          } else {
            // User is found---password is correct---generate token
            const token = generateAuthToken(user);
            // return success message including token in JSON format
            res.status(200).send({
              message: 'Authentication successful',
              userData:
              {
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                phone: user.phone,
              },
              authToken: token
            });
          }
        }
      }).catch(error => res.status(500).send({ error: error.message, status: 500 }));
  },
  //Users can view all other users
  fetchUsers(req, res) {
    return models.User
      .findAll({ attributes:
        ['firstname', 'lastname', 'username', 'email', 'phone']
      })
      .then(users => res.status(200).send(users))
      .catch((error) => {
        if (error) {
          res.status(500).send({
            error: error.message, status: 500
          });
        }
      });
  },
  //Users can search for other users or groups
  search(req, res) {
    //make sure search context is specified
    if (!req.body.search || req.body.search.trim() === '') {
      return res.status(400).send({
        error: {
          message: 'Please specify a search context'
        }
      });
    }
    if (!Object.keys(req.body)[1] || (req.body[Object.keys(req.body)[1]]).trim() === '') {
      return res.status(400).send({
        error: {
          message: 'Please specify a search term'
        }
      });
    }
    let searchTerm;
    // if the search context is users, search the users database
    if (req.body.search === 'users') {
      if (Object.keys(req.body)[1] === 'firstname' || 'lastname' || 'username' || 'email') {
        searchTerm = req.body[Object.keys(req.body)[1]];
        return models.User
          .findAll({
            where: { [Object.keys(req.body)[1]]: searchTerm },
            attributes: ['firstname', 'lastname', 'username', 'email']
          })
          .then((user) => {
            if (user.length === 0) {
              res.status(400).send({
                error: {
                  message:
                  `${Object.keys(req.body)[1]}: ${searchTerm}, could not be found or does not exist`
                }
              });
            } else { res.status(200).send(user); }
          })
          .catch((error) => {
            if (error) {
              res.status(400).send({
                error: { message: 'Bad request. Check for the correct search term' }
              });
            }
          });
      }
    }
    // if the search context is groups, search the groups database
    if (req.body.search === 'groups') {
      if (Object.keys(req.body)[1] !== 'groupname') {
        res.status(400).send({
          error: {
            message: 'The first field must have parameter *groupname*'
          }
        });
      }
      searchTerm = req.body.groupname;
      return models.Group
      .findAll({
        where: { groupname: searchTerm },
        attributes: ['groupname', 'description', 'createdAt']
      })
      .then((group) => {
        if (group.length === 0) {
          res.status(400).send({
            error: {
              message: `${searchTerm} could not be found or does not exist`
            }
          });
        } else { res.status(200).send(group); }
      })
      .catch((error) => {
        if (error) {
          res.status(400).send({
            error: { message: 'Bad request. Check search term or make the right API call' }
          });
        }
      });
    }
  },
  // Users can request for a new password
  passwordRequest(req,res) {
    if (!req.body.email || req.body.password.email.trim() === '') {
      return res.status(400).send({
        error: { message: 'Your postit associated email is required' }
      });
    }
    const email = req.body.email;
    const date = new Date();
  },
};
