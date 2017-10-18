import models from '../models';

export default {
  // Send message to a group
  createMessage(req, res) {
    if (!req.body.message || req.body.message.trim() === '') {
      return res.status(400).send({
        error: { message: 'Message body cannot be empty' }
      });
    }
    models.UserGroup
    .findOne({
      where: {
        username: req.decoded.data.username,
        groupname: req.params.groupname
      }
    }).then((userInGroup) => {
      if (!userInGroup) {
        return res.status(401).send({
          error: {
            message: `User does not belong to group '${req.params.groupname}'`
          }
        });
      }
      return models.Message
      .create({
        message: req.body.message,
        fromUser: req.decoded.data.username,
        toGroup: req.params.groupname,
        priority: req.body.priority.toLowerCase()
      })
      .then((message) => {
        res.status(201).send(message);
      }) // message created
      .catch(error => res.status(500).send({
        error: error.message,
        status: 500
      }));
    });
  },
  // Group messages
  fetchMessages(req, res) {
    models.Group
    .findOne({
      where: { groupname: req.params.groupname }
    }).then((group) => {
      if (!group) {
        return res.status(404).send({
          error: {
            message: ` Group: ${req.params.groupname},
            does not exist on postit.`
          }
        });
      }
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
      });
    }).catch((error) => {
      if (error) {
        res.status(500).send({ error: error.message });
      }
    });
  }
};
