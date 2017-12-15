import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import models from '../models';

dotenv.config();

/**
 * getMembersEmail helper
 * helps to aggregate email addresses of group members
 * except the message creator
 *
 * @param {groupname} groupname
 * @param {username} username of sender
 * @returns {promise} Array - array of members email addresses
 */
const getMembersEmail = (groupname, username) => {
  return new Promise((resolve, reject) => {
    models.Group
      .findOne({ where: { groupname } })
      .then((group) => {
        group.getUser({
          attributes: ['email'],
          where: { username: { $ne: username } }
        }).then((groupMembers) => {
          resolve(groupMembers);
        }).catch(error => reject(error));
      }).catch(error => reject(error));
  });
};

/**
 * sendMail helper
 * Sends out email based on supplied addresses and request
 *
 * @return {object} returns a response object
 * @return {string} error | info
 *
 * @param  {object} req - request object parameter
 * @param  {object} res - response object paramter
 * @param {string} mailType - passworid reset or notification check
 * @param {string} email - email address of recipient
 * @param {object} param1 - mail content
 */
const sendMail = (req, res, mailType, email,
  { subject, notification: html }) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'no-reply<no_reply@postit.com>',
    to: email,
    subject,
    html
  };

  if (mailType === 'reset') {
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
  } else {
    transporter.sendMail(mailOptions, (error, info) => {
      return new Promise((resolve, reject) => {
        if (error) {
          return Promise.reject(error);
        }
        return Promise.resolve(info);
      });
    });
  }
};

export { sendMail, getMembersEmail };
