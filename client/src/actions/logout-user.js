/**
 * Since we are using JWTs, we just need to remove the token
* from localStorage. These actions are more useful if we
* were calling the API to log the user out
*/
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

/**
 * onLogoutRequest()
 * @return {object} - action-type, loading status
 * and authentication status properties for a
 * logout request
*/
export const onLogoutRequest = () => ({
  type: LOGOUT_REQUEST,
  userIsLoading: true,
  userIsAuthenticated: true
});
/**
 * onLogoutSuccess()
 * @param {string} - message to be displayed to user
 * @return {object} - action-type, loading status,
 * authentication status, and success message properties for
 * successful logout
*/
export const onLogoutSuccess = message => ({
  type: LOGOUT_SUCCESS,
  userIsLoading: false,
  userIsAuthenticated: false,
  message
});
/**
 * onLogoutUser()
 * @return {function} - onLogoutRequest()
 * and onLogoutSuccess that logout a user
*/
const onLogoutUser = () =>
  (dispatch) => {
    dispatch(onLogoutRequest());
    localStorage.clear();
    location.hash = '#login';
    dispatch(onLogoutSuccess('You signed out successfully'));
  };

export default onLogoutUser;

