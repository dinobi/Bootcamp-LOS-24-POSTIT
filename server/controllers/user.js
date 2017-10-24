/* eslint-disable no-useless-escape */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import models from '../models';
import { generateAuthToken } from '../helpers/authService';
import filterUser from '../helpers/filterUser';
import { loginValidator, signupValidator, uniqueValidator }
from '../helpers/inputValidator';

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
                'Authentication failed. Incorrect password' } });
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
          res.status(404).send({ error:
          { message:
            'Authentication failed. Username is incorrect or does not exist'
          }
          });
        } else if (user) {
          if (!(bcrypt.compareSync(req.body.password, user.password))) {
            res.status(404).send({ error:
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
  // Search
  search(req, res) {
    let searchField;
    let searchTerm;
    if (!req.body.search || req.body.search.trim() === '') {
      return res.status(400).send({
        error: {
          message: 'Please specify a search context'
        }
      });
    }
    searchField = Object.keys(req.body)[1];
    if (
      !searchField || req.body[searchField].trim()
      === ''
    ) {
      return res.status(400).send({
        error: {
          message: 'Please specify a search option'
        }
      });
    }
    // if the search context is users, search the users database
    if (req.body.search === 'users') {
      if (
        searchField === 'firstname' || 'lastname' || 'username' || 'email'
      ) {
        searchTerm = req.body[searchField];
        models.User
          .findAll({
            where: { [searchField]: { $iLike: `%${searchTerm}%` } },
            attributes: ['firstname', 'lastname', 'username', 'email']
          })
          .then((returnedUser) => {
            if (returnedUser.length === 0) {
              res.status(400).send({
                error: {
                  message:
                  `No result for ${searchField}, ${searchTerm}`
                }
              });
            } else {
              const result = returnedUser.filter(user =>
                user.username !== req.decoded.data.username
              );
              res.status(200).send(result);
            }
          })
          .catch((error) => {
            if (error) {
              res.status(400).send({
                error:
                { message: 'Bad request. Check for the correct search term' }
              });
            }
          });
      } else {
        searchField = 'username';
      }
    }
    // if the search context is groups, search the groups database
    if (req.body.search === 'groups') {
      if (
        searchField === 'groupname' || 'description'
      ) {
        searchTerm = req.body[searchField];
        models.Group
          .findAll({
            where: { [searchField]: { $iLike: `%${searchTerm}%` } },
            attributes: ['groupname', 'description']
          })
          .then((returnedGroup) => {
            if (returnedGroup.length === 0) {
              res.status(400).send({
                error: {
                  message:
                  `No result for ${searchField}, ${searchTerm}`
                }
              });
            } else {
              res.status(200).send(returnedGroup);
            }
          })
          .catch((error) => {
            if (error) {
              res.status(400).send({
                error:
                { message: 'Bad request. Check for the correct search term' }
              });
            }
          });
      }
    }
  },
  // Users can request for a new password
  requestPassword(req, res) {
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
      .findOne({ where: { email }
      }).then((user) => {
        if (!user) {
          res.status(404).send({
            error: {
              message:
              'We do not have this email in our record'
            }
          });
        }
        const transporter = nodemailer.createTransport({
          service: process.env.MAIL_SERVICE,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
          }
        });
        const secret = req.body.email;
        const hash = crypto
        .createHash('sha256', secret)
        .update(Date.now().toString())
        .digest('hex');
        const date = new Date();
        date.setHours(date.getHours() + 1);
        const expiresIn =
        `${date.toString().split(' ')[2]}:${date.toString().split(' ')[4]}`;
        console.log('ExpiresIn:::::', date.toString());
        user.update({
          resetPassToken: hash,
          expiry: expiresIn
        }).then(() => {
          const mailOptions = {
            from: 'no-reply <no_reply@postit.com>',
            to: email,
            subject: 'Password Reset Link',
            html: `Hello ${email}, <br/><br/>if you have requested
            for a new password, please follow \n
            <a href='${process.env.APP_URL}/#/
            reset-password/${hash}'>this link</a>
            to reset your password.`,
            text: `Please follow please follow \n
            <a href=
            '${process.env.APP_URL}/#/
            reset-password/${hash}'>this link</a>
            to reset your password.`
          };
          models.PasswordReset
            .findOne({
              where: { email }
            }).then((existRes) => {
              if (existRes === null) {
                models.PasswordReset
                .create({
                  email,
                  expiresIn,
                  hash
                }).then(() => {
                  transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      return res.status(503).send({
                        error: {
                          message: 'Unable to send email, something went wrong'
                        }
                      });
                    }
                    return res.status(200).send({
                      info,
                      message: 'Password reset link has been sent to your email'
                    });
                  });
                });
              } else {
                existRes.update({
                  hash,
                  expiresIn
                }).then(() => {
                  transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      return res.status(503).send({
                        error: {
                          message: 'Unable to send email, something went wrong'
                        }
                      });
                    }
                    return res.status(200).send({
                      info,
                      message: 'Password reset link has been sent to your email'
                    });
                  });
                });
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
      const email = result.dataValues.email;
      console.log('Email in db::::::', email);
      const date = new Date();
      const now =
      `${date.toString().split(' ')[2]}:${date.toString().split(' ')[4]}`;
      if (now > result.dataValues.expiresIn) {
        res.status(200).send({
          error: { message: 'This link is invalid or has expired' }
        });
        return;
      }
      return models.User
        .update(
          { password: hashedPass },
          { where: { email } }
        ).then(() =>
          res.status(200).send({ message: 'Password Reset Successful' })
        );
    });
  },
};
