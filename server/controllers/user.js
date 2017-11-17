/* eslint-disable no-useless-escape */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
import models from '../models';
import { generateAuthToken } from '../helpers/authService';
import filterUser from '../helpers/filterUser';
import { loginValidator, signupValidator, uniqueValidator }
  from '../helpers/inputValidator';
import { sendMail } from '../helpers/emailHandler';

dotenv.config();

const salt = bcrypt.genSaltSync(8);
export default {
  // A visitor can create a new account
  createNewUser(req, res) {
    if (signupValidator(req, res) !== 'validated') {
      return;
    }
    return models.User
      .create({
        username: req.body.username.trim().toLowerCase(),
        email: req.body.email.trim().toLowerCase(),
        password: bcrypt.hashSync(req.body.password, salt, null),
        phone: req.body.phone
      })
      .then((user) => {
        user.save()
          .then((savedUser) => {
            const token = generateAuthToken(savedUser);
            res.status(201)
              .send({
                message: 'User account successfully created.',
                userData: filterUser(user),
                authToken: token
              });
          })
          .catch(error =>
            res.status(500).send({ error: error.message, status: 500 }));
      })
      .catch((error) => {
        if (uniqueValidator(res, error) !== 'validated') {
          return;
        }
      });
  },
  // User login
  authUser(req, res) {
    if (loginValidator(req, res) !== 'validated') {
      return;
    }
    const data = req.body.username;
    // With email
    if (data.match(/@/) !== null) {
      return models.User
        .findOne({ where: { email: data } })
        .then((user) => {
          if (!user) {
            res.status(404).send({
              error: {
                message:
                'Authentication failed. Email is incorrect or does not exist'
              }
            });
          } else if (user) {
            if (!(bcrypt.compareSync(req.body.password, user.password))) {
              res.status(404).send({
                error: {
                  message:
                  'Authentication failed. Incorrect password'
                }
              });
            } else {
              const token = generateAuthToken(user);
              res.status(200).send({
                message: 'Authentication successful',
                userData: filterUser(user),
                authToken: token
              });
            }
          }
        }).catch(error =>
          res.status(500).send({
            error: error.message, status: 500
          }));
    }
    // With username
    return models.User
      .findOne({ where: { username: data } })
      .then((user) => {
        if (!user) {
          res.status(404).send({
            error:
            {
              message:
              'Authentication failed. Username is incorrect or does not exist'
            }
          });
        } else if (user) {
          if (!(bcrypt.compareSync(req.body.password, user.password))) {
            res.status(404).send({
              error:
              { message: 'Authentication failed. Incorrect password' }
            });
          } else {
            const token = generateAuthToken(user);
            res.status(200).send({
              message: 'Authentication successful',
              userData: filterUser(user),
              authToken: token
            });
          }
        }
      }).catch(error => res.status(500).send({
        error: error.message, status: 500
      }));
  },
  // All Users
  fetchUsers(req, res) {
    return models.User
      .findAll({
        attributes:
        ['username', 'email', 'phone']
      })
      .then(users => res.status(200).send({
        message: 'success',
        users
      }))
      .catch((error) => {
        if (error) {
          res.status(500).send({
            error: error.message, status: 500
          });
        }
      });
  },
  // Search
  search(req, res) {
    const searchTerm = req.params.searchTerm;
    if (!searchTerm || searchTerm.trim() === '') {
      return res.status(400).send({
        error: { message: 'please specify a search term' }
      });
    }
    return models.User
    .findAll({
      limit: 10,
      offset: req.params.page * 10,
      where: {
        username: {
          $iLike: `%${searchTerm}%`,
          $ne: req.decoded.data.username
        }
      },
      attributes: ['username', 'email']
    })
    .then((users) => {
      const existingUsers = [];
      const newUsers = [];
      if (users.length === 0) {
        return res.status(200).send({
          userData: newUsers,
          message: `No search result for ${searchTerm}`
        });
      }
      let n = 0;
      users.map((user) => {
        return models.UserGroup
        .find({
          where: { username: user.username, groupname: req.params.groupname },
          attributes: ['username']
        }).then((result) => {
          n += 1;
          if (result !== null) {
            existingUsers.push(user);
          } else {
            newUsers.push(user);
          }
          if (n === users.length) {
            return res.status(200).send({ userData: newUsers });
          }
        }).catch(error => res.status(503).send({
          error: error.message, status: 503
        }));
      });
    }).catch(error => res.status(500).send({
      error: error.message, status: 500
    }));
  },
  // Users can request for a new password
  requestPassword(req, res) {
    const mailType = 'reset';
    const { email } = req.body;
    if (!email || email.trim() === '') {
      return res.status(400).send({
        error: { message: 'Your postit associated email is required' }
      });
    }
    const emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailRE.test(email)) {
      return res.status(400)
        .send({
          error: { message: 'Enter a valid email' }
        });
    }
    return models.User
      .findOne({
        where: { email }
      }).then((user) => {
        if (!user) {
          res.status(404).send({
            error: {
              message:
              'We do not have this email in our record'
            }
          });
        }
        const secret = req.body.email;
        const hash = crypto
          .createHash('sha256', secret)
          .update(Date.now().toString())
          .digest('hex');
        const expiresIn = Date.now() + 3600000;
        user.update({
          resetPassToken: hash,
          expiry: expiresIn
        }).then(() => {
          const message = `Hello ${email}, <br/><br/>if you have requested
          for a new password to your PostIt account, please follow  \n
          <a href='${process.env.APP_URL}/#/reset-password/${hash}'>
            this link
          </a>
          to reset your password.`;
          models.PasswordReset
            .findOne({
              where: { email }
            }).then((emailExistRes) => {
              if (emailExistRes === null) {
                models.PasswordReset
                  .create({
                    email,
                    expiresIn,
                    hash
                  }).then(() => {
                    sendMail(req, res, mailType, email,
                      { subject: 'Password Reset Link', message }
                    );
                  }).catch(error => res.status(500).send({
                    error: error.message, status: 500
                  }));
              } else {
                emailExistRes.update({
                  hash,
                  expiresIn
                }).then(() => {
                  sendMail(req, res, mailType, email,
                    { subject: 'Password Reset Link', message }
                  );
                }).catch(error => res.status(500).send({
                  error: error.message, status: 500
                }));
              }
            });
        });
      });
  },
  resetPassword(req, res) {
    const hashedPass = bcrypt.hashSync(req.body.password, salt, null);
    models.PasswordReset
      .findOne({
        where: { hash: req.params.hash }
      }).then((result) => {
        if (result === null) {
          return res.status(404).send({
            error: { message:
              'The provided token does not exist or has been used'
            }
          });
        }
        const email = result.dataValues.email;
        const now = Date.now();
        if (now > result.dataValues.expiresIn) {
          return res.status(400).send({
            error: { message: 'This link is invalid or has expired' }
          });
        }
        models.User
        .update({ password: hashedPass },
          { where: { email } }
          ).then(() =>
            res.status(200).send({ message: 'Password Reset Successful' })
          ).catch(error => res.status(500).send({
            error: error.message, status: 500
          }));
        return result.destroy({ where: { email } });
      }).catch(error => res.status(500).send({
        error: error.message, status: 500
      }));
  },
};
