import models from '../models';

const verifyUser = (username, req, res) => {
  models.User.findOne({ where: { username } })
  .then((user) => {
    // check if the username belongs to a registered user
    if (!user) {
      return res.status(404).send({
        error: {
          message: 'User not found. User has no PostIt account'
        }
      });
    }
    return 'verified';
  }).catch(error =>
    res.status(500).send({
      error: error.message, status: 500 })
  );
};

export default verifyUser;
