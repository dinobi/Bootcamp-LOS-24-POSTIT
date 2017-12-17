/**
 * filterUser helper
 * Strips down a user object to two properties
 *
 * @returns {Object} user - filtered user object
 *
 * @param {*} user - object parameter
 */
const filterUser = user => ({
  username: user.username,
  email: user.email,
  phone: user.phone
});

export default filterUser;
