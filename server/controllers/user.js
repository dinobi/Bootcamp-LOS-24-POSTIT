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
import errorResponse from '../helpers/errorResponse';

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
          .catch(error => errorResponse(res, 500, null, error));
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
            const message =
            'Authentication failed. Email is incorrect or does not exist';
            return errorResponse(res, 404, message, null);
          } else if (user) {
            if (!(bcrypt.compareSync(req.body.password, user.password))) {
              const message = 'Authentication failed. Incorrect password';
              errorResponse(res, 404, message, null);
            } else {
              const token = generateAuthToken(user);
              return res.status(200).send({
                message: 'Authentication successful',
                userData: filterUser(user),
                authToken: token
              });
            }
          }
        }).catch(error => errorResponse(res, 500, null, error));
    }
    // With username
    return models.User
      .findOne({ where: { username: data } })
      .then((user) => {
        if (!user) {
          const message =
          'Authentication failed. Username is incorrect or does not exist';
          return errorResponse(res, 404, message, null);
        } else if (user) {
          if (!(bcrypt.compareSync(req.body.password, user.password))) {
            const message = 'Authentication failed. Incorrect password';
            errorResponse(res, 404, message, null);
          } else {
            const token = generateAuthToken(user);
            return res.status(200).send({
              message: 'Authentication successful',
              userData: filterUser(user),
              authToken: token
            });
          }
        }
      }).catch(error => errorResponse(res, 500, null, error));
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
      .catch(error => errorResponse(res, 500, null, error));
  },
  // Search
  search(req, res) {
    const searchTerm = req.params.searchTerm;
    if (!searchTerm || searchTerm.trim() === '') {
      const message = 'please specify a search term';
      return errorResponse(res, 400, message, null);
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
        }).catch(error => errorResponse(res, 503, null, error));
      });
    }).catch(error => errorResponse(res, 500, null, error));
  },
  // Users can request for a new password
  requestPassword(req, res) {
    const mailType = 'reset';
    const { email } = req.body;
    if (!email || email.trim() === '') {
      const message = 'Your postit associated email is required';
      return errorResponse(res, 400, message, null);
    }
    const emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailRE.test(email)) {
      const message = 'Enter a valid email';
      return errorResponse(res, 400, message, null);
    }
    return models.User
      .findOne({
        where: { email }
      }).then((user) => {
        if (!user) {
          const message = 'We do not have this email in our record';
          return errorResponse(res, 404, message, null);
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
          const notification = `Hello ${email}, <br/><br/>if you have requested
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
                      { subject: 'Password Reset Link', notification }
                    );
                  }).catch(error => errorResponse(res, 500, null, error));
              } else {
                emailExistRes.update({
                  hash,
                  expiresIn
                }).then(() => {
                  sendMail(req, res, mailType, email,
                    { subject: 'Password Reset Link', notification }
                  );
                }).catch(error => errorResponse(res, 500, null, error));
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
          const message = 'The provided token does not exist or has been used';
          return errorResponse(res, 404, message, null);
        }
        const email = result.dataValues.email;
        const now = Date.now();
        if (now > result.dataValues.expiresIn) {
          const message = 'This link is invalid or has expired';
          return errorResponse(res, 400, message, null);
        }
        models.User
        .update({ password: hashedPass },
          { where: { email } }
          ).then(() =>
            res.status(200).send({ message: 'Password Reset Successful' })
          ).catch(error => errorResponse(res, 500, null, error));
        return result.destroy({ where: { email } });
      }).catch(error => errorResponse(res, 500, null, error));
  },
};
