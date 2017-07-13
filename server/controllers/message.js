import models from '../models';

export default {
  create(req, res) {
    return models.Message
      .create({
        message: req.body.message,
        from_user: req.body.from_user,
        to_group: req.body.to_group,
        priority: req.body.priority
      })
      .then(message => res.status(201).send(message)) // message created
      .catch(error => res.status(400).send(error)); // bad request
  }
};
