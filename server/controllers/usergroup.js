import models from '../models';

export default {
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
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return models.UserGroup
      .update({
        update_trigger: Math.floor((Math.random() * 10000) + 1) },
      { where: {
        username: req.body.username,
        groupname: req.body.groupname
      }
      })
      .then(result => res.statu(202).send(result))
      .catch(error => res.statu(400).send(error));
  }
};
