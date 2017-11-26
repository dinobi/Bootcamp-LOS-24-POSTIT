import models from '../models';
import errorResponse from '../helpers/errorResponse';

/**
 * verifyAuthUser
 * extracts username of currently logged in user from
 * a decoded token and save for future request
 *
 * @returns {next} next - next middleware to handle request
 * @returns {object} res - response when user cannot be found
 * @param {object} req - response object
 * @param {object} res - response object
 * @param {next} next - function
 */
const verifyAuthUser = (req, res, next) => {
  const { username } = req.decoded.data;
  models.User.findOne({ where: { username } })
    .then((user) => {
      req.body.user = user;
      next();
    }).catch(error => errorResponse(res, 500, null, error));
};

/**
 * verifyUser
 * verifies that a user exist and extracts user
 * for future request
 *
 * @returns {next} next - next middleware to handle request
 * @returns {object} res - response when user cannot be found
 * @param {object} req - response object
 * @param {object} res - response object
 * @param {next} next - function
 */
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

/**
 * verifyGroup
 * verifies that a group exist and extracts group
 * for future use
 *
 * @returns {next} next - next middleware to handle request
 * @returns {object} res - response when user cannot be found
 * @param {object} req - response object
 * @param {object} res - response object
 * @param {next} next - function
 */
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
