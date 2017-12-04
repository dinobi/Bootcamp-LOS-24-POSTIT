/**
 * Since we are using JWTs, we just need to remove the token
* from localStorage. These actions are more useful if we
* were calling the API to log the user out
*/
export const LOGOUT = 'LOGOUT';
/**
 *
 * @param {message} message
 * @returns {Object} - new state
 */
export const logout = () => ({
  type: LOGOUT
});
/**
 * onLogoutUser()
 * @return {function} - onLogoutRequest()
 * and onLogoutSuccess that logout a user
*/
const onLogoutUser = () =>
  (dispatch) => {
    dispatch(logout());
    localStorage.clear();
    location.hash = '#login';
  };

export default onLogoutUser;

