// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

/** */
export const onLogoutRequest = () => ({
  type: LOGOUT_REQUEST,
  isLoading: true,
  isAuthenticated: true
});
/** */
export const onLogoutSuccess = message => ({
  type: LOGOUT_SUCCESS,
  isLoading: false,
  isAuthenticated: false,
  message
});

const onLogoutUser = () => {
  return (dispatch) => {
    dispatch(onLogoutRequest());
    localStorage.removeItem('userAuth')
    dispatch(onLogoutSuccess('You signed out successfully'));
    location.hash = '#login';
  };
};

export default onLogoutUser;
