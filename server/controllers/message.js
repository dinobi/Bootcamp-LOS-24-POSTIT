import models from '../models';
import { messageValidator } from '../helpers/inputValidator';
import { sendMail, getMembersEmail } from '../helpers/emailHandler';
import errorResponse from '../helpers/errorResponse';

export default {
  /**
  * creatMessage controller
  * Allows users create a new message
  *
  * Route: POST: /api/groups/:groupname/send-message/
  *
  * @param  {object} req - request object parameter
  * @param  {object} res - response object paramter
  *
  * @return {object} returns a response object
  */
  createMessage(req, res) {
    const { user, group } = req.body;
    const message = req.body.message;
    const priority = req.body.priority;
    const groupname = group.groupname;
    const username = user.username;
    if (messageValidator(
      message, priority, req, res
    ) !== 'validated') {
      return;
    }
    group.hasUser(user)
      .then((userInGroup) => {
        if (!userInGroup) {
          const errorMessage =
            `User does not belong to group '${req.params.groupname}'`;
          return errorResponse(res, 401, errorMessage, null);
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
            const notification = `Hello, <br><br>You have a new message
            marked as ${priority} on ${groupname}<br><br>
            MESSAGE: ${newMessage.message}<br><br>FROM: ${username}<br><br>
            click on <a href='${process.env.APP_URL}/#/groups/${groupname}'>
            this link</a> to view more`;
            const subject = `PostIt: New ${priority} message`;
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
                }).catch(error => errorResponse(res, 500, null, error));
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
                }).catch(error => errorResponse(res, 500, null, error));
                break;
              default:
                return '';
            }
          }).catch(error => errorResponse(res, 500, null, error));
      });
  },
  /**
  * fetchMessages controller
  * Allows users view all the messages that has been
  * sent to groups that they belong
  *
  * Route: GET: /api/groups/:groupname/show-message/
  *
  * @param  {object} req - request object parameter
  * @param  {object} res - response object paramter
  *
  * @return {object} returns a response object
  */
  fetchMessages(req, res) {
    const { user, group } = req.body;
    const groupname = group.groupname;
    group.hasUser(user)
    .then((userInGroup) => {
      if (!userInGroup) {
        const errorMessage =
        `User does not belong to group '${groupname}'`;
        return errorResponse(res, 401, errorMessage, null);
      }
      return models.Message
      .findAll({
        where: { toGroup: req.params.groupname },
        attributes: [
          'id',
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
      }).catch(error => errorResponse(res, 500, null, error));
    }).catch(error => errorResponse(res, 500, null, error));
  }
};
