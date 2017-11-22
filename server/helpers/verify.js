import models from '../models';
import errorResponse from '../helpers/errorResponse';

// Autheticated user
const verifyAuthUser = (req, res, next) => {
  const { username } = req.decoded.data;
  models.User.findOne({ where: { username } })
  .then((user) => {
    req.body.user = user;
    next();
  }).catch(error => errorResponse(res, 500, null, error));
};
// user
const verifyUser = (req, res, next) => {
  const { username } = req.body;
  if (!username || username.trim() === '') {
    const message = 'Bad request, username is required';
    return errorResponse(res, 400, message, null);
  }
  models.User.findOne({ where: { username } })
    .then((user) => {
      // check if the username belongs to a registered user
      if (!user) {
        const message = 'User not found. User has no PostIt account';
        return errorResponse(res, 404, message, null);
      }
      req.body.user = user;
      next();
    }).catch(error => errorResponse(res, 500, null, error));
};
// group
const verifyGroup = (req, res, next) => {
  let groupname;
  /* eslint-disable no-unused-expressions */
  req.params.groupname ? { groupname } = req.params :
    { groupname } = req.body;
  if (!groupname || groupname.trim() === '') {
    const message = 'Bad request, groupname is required';
    return errorResponse(res, 400, message, null);
  }
  models.Group.findOne({ where: { groupname } })
    .then((group) => {
      if (!group) {
        const message = `${groupname} does not exist on PostIt`;
        return errorResponse(res, 404, message, null);
      }
      req.body.group = group;
      next();
    }).catch(error => errorResponse(res, 500, null, error));
};

export { verifyUser, verifyAuthUser, verifyGroup };
