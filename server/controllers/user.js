import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models';

const salt = bcrypt.genSaltSync(8);
export default {
  //create a new user account
  create(req, res) {
    if (!req.body.firstname || req.body.firstname.trim() === '') {
      return res.status(400)
      .send({
        error: { message: 'firstname field cannot be empty' },
        userData: req.body
      });
    }
    if (!req.body.lastname || req.body.lastname.trim() === '') {
      return res.status(400)
      .send({
        error: { message: 'lastname field cannot be empty' },
        userData: req.body
      });
    }

    if (!req.body.username || req.body.username.trim() === '') {
      return res.status(400)
      .send({
        error: { message: 'username field cannot be empty' },
        userData: req.body
      });
    }

    if (!req.body.email || req.body.email.trim() === '') {
      return res.status(400)
      .send({
        error: { message: 'email field cannot be empty' },
        userData: req.body
      });
    }

    if (!req.body.password || req.body.password.trim() === '') {
      return res.status(400)
      .send({
        error: { message: 'password field cannot be empty' },
        userData: req.body
      });
    }

    if (!req.body.phone || req.body.phone.trim() === '') {
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
        if (error.errors[0].message === 'username must be unique') {
          res.status(400).send({
            error: { message: 'Username already exists' }
          });
        } else if (error.errors[0].message === 'email must be unique') {
          res.status(400).send({
            error: { message: 'Email already exists' }
          });
        } else if (error.errors[0].message === 'Validation isAlpha on firstname failed') {
          res.status(400).send({
            error: { message: 'Firstname cannot contain digits' }
          });
        } else if (error.errors[0].message === 'Validation isAlpha on lastname failed') {
          res.status(400).send({
            error: { message: 'Lastname cannot contain digits' }
          });
        } else if (error.errors[0].message === 'Validation isEmail on email failed') {
          res.status(400).send({
            error: { message: 'Enter a valid email' }
          });
        }
      });
  },
  //Login in a user
  auth(req, res) {
    models.User
      .findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          res.status(404).send({
            message: 'Authentication failed.Username is incorrect or does not exist'
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
          }
        }
      });
  },  
  //View all users
  fetch(req, res) {
    return models.User
      .findAll({ attributes:
        ['firstname', 'lastname', 'username', 'email', 'phone']
      })
      .then(users => res.status(200).send(users))
      .catch((error) => {
        if (error) {
          res.status(400).send({
            error: { message: 'Bad request, check for correct API call' }
          });
        }
      });
  },
  //Search for users or groups
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
                  message: `${Object.keys(req.body)[1]}: ${searchTerm}, could not be found or does not exist`
                }
              });
            } else { res.status(200).send(user); }
          })
          .catch((error) => {
            if (error) {
              res.status(400).send({
                error: { message: 'Bad request. Check search term or make the right API call' }
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
};
