import models from '../models';
import { messageValidator } from '../helpers/inputValidator';
import { sendMail, getMembersEmail } from '../helpers/emailHandler';

export default {
  // Send message to a group
  createMessage(req, res) {
    const message = req.body.message;
    const priority = req.body.priority;
    const groupname = req.params.groupname;
    const username = req.decoded.data.username;
    if (messageValidator(
        message, priority, groupname, req, res
      ) !== 'validated') {
      return;
    }
    models.UserGroup
    .findOne({
      where: {
        username: req.decoded.data.username,
        groupname
      }
    }).then((userInGroup) => {
      if (!userInGroup) {
        return res.status(401).send({
          error: {
            message: `User does not belong to group '${req.params.groupname}'`,
            status: 401
          }
        });
      }
      return models.Message
      .create({
        message,
        fromUser: username,
        toGroup: groupname,
        priority: priority.toLowerCase()
      })
      .then((newMessage) => {
        res.status(201).send(newMessage);
        const mailType = 'notification';
        const notification = `Hello, <br><br>You have a new message marked as
          ${priority} on ${groupname}<br><br>${newMessage.message}<br><br>
          <${username}><br><br> click on
          <a href='${process.env.APP_URL}/#/groups/rainier team'>this link
        </a> to view more`;
        const subject = `POSTIT: New ${priority} message`;
        switch (priority.toLowerCase()) {
          case 'critical':
            // send email
            getMembersEmail(groupname, username).then((members) => {
              if (members.length > 0) {
                members.map(member =>
                  sendMail(req, res, mailType, member.email,
                    { subject, notification }
                  )
                );
              }
              return '';
            }).catch(error => res.status(500).send({
              error: error.message,
              status: 500
            }));
            break;
          case 'urgent':
            getMembersEmail(groupname, username).then((members) => {
              if (members.length > 0) {
                members.map(member =>
                  sendMail(req, res, mailType, member.email,
                    { subject, notification }
                  )
                );
              }
              return '';
            }).catch(error => res.status(500).send({
              error: error.message,
              status: 500
            }));
            break;
          default:
            return '';
        }
      }) // message created
      .catch(error => res.status(500).send({
        error: error.message,
        status: 500
      }));
    });
  },
  // Group messages
  fetchMessages(req, res) {
    return models.Message
      .findAll({
        where: { toGroup: req.params.groupname },
        attributes: [
          'message',
          'fromUser',
          'toGroup',
          'priority',
          'createdAt'
        ],
      })
      .then((message) => {
        if (message.length === 0) {
          return res.status(200).send({
            message: 'There are no new messages found at this time'
          });
        }
        return res.status(200).send(message);
      }).catch((error) => {
        if (error) {
          res.status(500).send({ error: error.message });
        }
      });
  }
};
