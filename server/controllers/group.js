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
  // Add member to group
  addMember(req, res) {
    if (!req.body.username) {
      res.status(400).send({ message: 'Bad request, username is required' });
      return;
    }
    if (!req.body.groupname) {
      res.status(400).send({ message: 'Bad request, groupname is required' });
      return;
    }
    return models.User
      .findOne({ where: { username: req.body.username } })
      .then((user) => {
        // check if the username belongs to a registered user
        if (!user) {
          res.status(404).send({
            message: 'Username not found. User has no PostIt account.'
          });
        } else if (user) {
          return models.UserGroup
            .create({
              username: req.body.username,
              groupname: req.params.groupname
            })
            .then(success => res.status(201).send(success))
            .catch((error) => {
              if (error.errors[0].message === 'username must be unique') {
                res.status(400).send({
                  error: { message: 'User already belongs to this group' }
                });
              }
            });
        }
      });
  },
  // Get List of group members
  fetchMembers(req, res) {
    return models.UserGroup
      .findAll({ where: { groupname: [req.params.groupname] } })
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send({ message: "you've not added any members" } ));
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
