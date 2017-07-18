import models from '../models';

export default {
  create(req, res) {
    if (!req.body.groupname) {
      res.status(400).send({ message: 'A group name is required' });
      return;
    }
    if (!req.body.description) {
      res.status(400).send({ message: 'A group descritption is required' });
      return;
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
        res.status(201).send(group);
      })
      .catch(error => res.status(400).send(error, 'Group Name Already Exist'));
  },
  // Display a users created group
  fetch(req, res) {
    return models.Group
      .findAll()
      .then(group => res.status(200).send(group))
      .catch((error) => {
        res.status(400).send(error, 'There are no created groups');
      });
  },
  // Add member to group
  addMember(req, res) {
    if (!req.body.username) {
      res.status(400).send({ message: 'Bad request, *username* is required' });
      return;
    }
    if (!req.body.groupname) {
      res.status(400).send({ message: 'Bad request, *groupname* is required' });
      return;
    }
    return models.UserGroup
      .create({
        username: req.body.username,
        groupname: req.params.groupname
      })
      .then(result => res.status(201).send(result))
      .catch(error => res.status(400).send({ message: 'group was not found' }));
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
