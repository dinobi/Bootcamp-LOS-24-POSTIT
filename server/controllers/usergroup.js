import models from '../models';

export default {
  addMember(req, res) {
    if (!req.body.user_id) {
      res.status(400).send({ message: 'Bad request, *user_id* is required' });
      return;
    }

    if (!req.body.group_id) {
      res.status(400).send({ message: 'Bad request, *group_id* is required' });
      return;
    }

    return models.UserGroup
      .create({
        user_id: req.body.user_id,
        group_id: req.params.id
      })
      .then(result => res.status(201).send(result))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return models.UserGroup
      .update({
        update_trigger: Math.floor((Math.random() * 10000) + 1) },
      { where: {
        user_id: req.body.user_id,
        group_id: req.body.group_id
      }
      })
      .then(result => res.statu(202).send(result))
      .catch(error => res.statu(400).send(error));
  }
};
