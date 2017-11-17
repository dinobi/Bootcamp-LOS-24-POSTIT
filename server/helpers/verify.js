import models from '../models';

const verifyUser = (req, res, next) => {
  const { username } = req.decoded.data.username;
  models.User.findOne({ where: { username } })
  .then((user) => {
    // check if the username belongs to a registered user
    if (!user) {
      return res.status(404).send({
        error: {
          message: 'User not found. User has no PostIt account'
        }
      }).catch((error) => {
        res.status(500).send({ error: error.message, status: 500 });
      });
    }
    req.body = user;
    next();
  });
};

const verifyGroup = (req, res, next) => {
  const { groupname } = req.params;
  models.Group.findOne({ where: { groupname } })
  .then((group) => {
    // check if the username belongs to a registered user
    if (!group) {
      return res.status(404).send({
        error: {
          message: ` Group: ${req.params.groupname},
          does not exist on postit.`,
          status: 404
        }
      });
    }
    next();
  }).catch((error) => {
    res.status(500).send({ error: error.message, status: 500 });
  });
};

export { verifyUser, verifyGroup };
