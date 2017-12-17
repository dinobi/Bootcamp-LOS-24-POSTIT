/**
* Since we are using JWTs, we just need to remove the token
* from localStorage.
*/
export const LOGOUT = 'LOGOUT';
/**
 * logout a user from the application
 *
 * @returns {Object} - new state
 */
export const logout = () => ({
  type: LOGOUT
});
/**
 * Allows a user logout from the app
 *
 * @return {function} - logout a user
*/
const onLogoutUser = () =>
  (dispatch) => {
    dispatch(logout());
    localStorage.clear();
    location.hash = '#login';
  };

export default onLogoutUser;

