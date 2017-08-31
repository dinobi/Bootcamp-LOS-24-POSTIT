import models from '../models';

export default {
  create(req, res) {
    if (!req.body.groupname || req.body.groupname.trim() === '') {
      return res.status(400).send({
        error: { message: 'A group name is required' }
      });
    }
    if (!req.body.description || req.body.description.trim() === '') {
      return res.status(400).send({
        error: { message: 'A group description is required' }
      });
    }
    return models.Group
      .create({
        groupname: req.body.groupname,
        description: req.body.description,
      })
      .then((group) => {
        models.UserGroup
      .create({
        username: req.body.username,
        groupname: req.params.groupname
      });
        res.status(201).send({
          message: `${group.groupname} was created successfully` });
      })
      .catch((error) => {
        if (error.errors[0].message === 'groupname must be unique') {
          res.status(400).send({
            error: { message: 'Group Name Already Exist' }
          });
        }
      });
  },
  delete(req, res) {
    if (!req.params.groupname || req.params.groupname.trim() === '') {
      return res.status(400).send({
        error: { message: 'Go to group you want to delete' }
      });
    }
    return models.Group
      .findOne({ where: { groupname: req.params.groupname } })
      .then((group) => {
        if (!group) {
          return res.status(200).send({ message: `Group - ${req.params.groupname}, does not exist` });
        }
        models.Group.destroy({ where: { groupname: req.params.groupname } });
        return res.status(200).send({
          message: `Group - ${req.params.groupname}, has been deleted`
        });
      });
  },
  // Display a users created group
  fetch(req, res) {
    return models.Group
      .findAll({ attributes:
        ['groupname', 'description']
      })
      .then(group => res.status(200).send(group))
      .catch((error) => {
        res.status(400).send({
          error: { message: 'There are no created groups' }
        });
      });
  },
  // Add/Remove member from group
  editGroup(req, res) {
    if (!req.body.username || req.body.username.trim() === '') {
      res.status(400).send({ message: 'Bad request, username is required' });
      return;
    }
    if (!req.params.groupname || req.params.groupname === '') {
      res.status(400).send({ message: 'Bad request, go to group you want to edit' });
      return;
    }
    return models.Group
      .findOne({ where: { groupname: req.params.groupname } })
      .then((group) => {
        // check if the username belongs to a registered user
        if (!group) {
          res.status(404).send({
            message: 'Group not found or has not been created'
          });
        }
        return models.User
          .findOne({ where: { username: req.body.username } })
          .then((user) => {
            // check if the username belongs to a registered user
            if (!user) {
              res.status(404).send({
                message: 'Username not found. User has no PostIt account.'
              });
            }
            return models.UserGroup
              .findOne({
                where: { username: req.body.username, groupname: req.params.groupname }
              })
              .then((result) => {
                if (result !== null) {
                  models.UserGroup.destroy({
                    where: { username: req.body.username,
                    groupname: req.params.groupname }
                  });
                  return res.status(200).send({
                    message: `${req.body.username} was successfully removed from ${req.params.groupname}`
                  })
                } else {
                  models.UserGroup.create({
                    username: req.body.username,
                    groupname: req.params.groupname
                  })
                  return res.status(201).send({
                    message: `${req.body.username} was successfully added to ${req.params.groupname}`
                  });
                }
              });
          });
      });
  },
  // Get List of group members
  fetchMembers(req, res) {
    return models.Group.findOne({ where: { groupname: req.params.groupname } })
      .then((group) => {
        if (!group) {
          res.status(400).send({
            error: { message: `Group - ${req.params.groupname} does not exist` }
          });
        } else {
          return models.UserGroup
          .findAll({ where: { groupname: req.params.groupname } })
          .then((result) => {
            if (result.length === 0) {
              res.status(200).send({
                message: 'You have not added any members'
              });
            } else {
              res.status(200).send(result);
            }
          });
        }
      });
  },
  // Send a message to a group
  createMessage(req, res) {
    return models.Message
      .create({
        body: req.body.message,
        from_user: req.body.from_user,
        to_group: req.body.to_group,
        priority: req.body.priority
      })
      .then(message => res.status(201).send(message)) // message created
      .catch(error => res.status(400).send(error)); // bad request
  },
  // Get all the messages from a group
  fetchMessages(req, res) {
    return models.Message
      .findAll({
        where: { to_group: [req.params.groupname] },
        attributes: [
          'body',
          'from_user',
          'to_group',
          'priority',
          'createdAt'
        ],
      })
      .then(message => res.status(200).send(message))
      .catch((error) => {
        console.log(error);
        res.status(404).send({ message: 'No messages found at this time' })
      });
  }
};
