import swal from 'sweetalert';
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
    const logoutMessage = 'You signed out successfully';
    dispatch(logout(logoutMessage));
    swal({
      text: logoutMessage,
      icon: 'success'
    });
    location.hash = '#login';
    localStorage.clear();
  };

export default onLogoutUser;

