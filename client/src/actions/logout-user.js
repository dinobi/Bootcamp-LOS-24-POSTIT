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
export const logout = message => ({
  type: LOGOUT,
  userIsAuthenticated: false,
  userData: {},
  message
});
/**
 * onLogoutUser()
 * @return {function} - onLogoutRequest()
 * and onLogoutSuccess that logout a user
*/
const onLogoutUser = () =>
  (dispatch) => {
    const Materialize = window.Materialize;
    const logoutMessage = 'You signed out successfully';
    dispatch(logout(logoutMessage));
    Materialize.toast(logoutMessage, 2500, 'green');
    location.hash = '#login';
    localStorage.clear();
  };

export default onLogoutUser;

