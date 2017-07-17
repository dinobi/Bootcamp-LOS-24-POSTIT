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
    return models.Group
      .findById(req.params.groupname, {
        include: [{
          model: models.User,
          as: 'users',
        }],
      })
      .then(groups => res.status(200).send(groups))
      .catch(error => res.status(400).send({ message: "you've not added any members" } ));
  },
  message(req, res) {
    return models.Message
      .create({
        from_user: req.body.from_user,
        to_group: req.body.to_group,
        message: req.body.message,
        priority: req.body.priority
      })
      .then(message => res.status(200).send(message))
      .catch(error => res.status(404).send(error));
  },
  messages(req, res) {
    models.Message
      .findAll({
        where: { to_group: [req.params.id] },
        attributes: [
          'id',
          'message',
          'from_user',
          'to_group',
          'priority',
          'createdAt'
        ],
      })
      .then(messages => res.status(200).send(messages))
      .catch(error => res.status(404).send(error));
  }
};
