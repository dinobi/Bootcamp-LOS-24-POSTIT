import models from '../models';

export default {
  create(req, res) {
    if (!req.body.name) {
      res.status(400).send({ message: 'Param: "group name" is required' });
      return;
    }
    return models.Group
      .create({
        name: req.body.name,
      })
      .then(group => res.status(201).send(group))
      .catch(error => res.status(400).send('Group Name Already Exist'));
  },
  fetch(req, res) {
    return models.Group
      .findAll()
      .then(group => res.status(200).send(group))
      .catch((error) => {
        console.log(error)
        res.status(400).send(error)
      });
  },
  fetchMembers(req, res) {
    return models.Group
      .findById(req.params.id, {
        include: [{
          model: models.User,
          as: 'users',
        }],
      })
      .then(groups => res.status(200).send(groups))
      .catch(error => res.status(400).send(error));
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
