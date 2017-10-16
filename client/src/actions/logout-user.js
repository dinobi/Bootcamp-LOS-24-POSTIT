/**
 * Since we are using JWTs, we just need to remove the token
* from localStorage. These actions are more useful if we
* were calling the API to log the user out
*/
export const LOGOUT = 'LOGOUT';

/**
 * onLogoutRequest()
 * @return {object} - action-type, loading status
 * and authentication status properties for a
 * logout request
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
    dispatch(logout('You signed out successfully'));
    location.hash = '#login';
    localStorage.clear();
  };

export default onLogoutUser;

