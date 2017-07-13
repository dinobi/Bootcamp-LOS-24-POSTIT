import models from '../models';

export default {
  addMember(req, res) {
    if (!req.body.user_id) {
      res.status(400).send({ message: 'Param: "user_id" is required' });
      return;
    }

    if (!req.body.group_id) {
      res.status(400).send({ message: 'Param: "group_id" is required' });
      return;
    }

    return models.UserGroup
      .create({
        user_id: req.body.user_id,
        group_id: req.params.id
      })
      .then(result => res.status(201).send(result))
      .catch(error => res.status(400).send(error));
  }
};
