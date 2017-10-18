import axios from 'axios';
// There are three possible states for user login
// seo we will need actions for each of them
import actionType from '../actionTypes';

// Login request action creator
export const onLoginRequest = loginCreds => ({
  type: actionType.LOGIN_REQUEST,
  userIsLoading: true,
  userIsAuthenticated: false,
});

// Login success action creator
export const onLoginSuccess = (message) => ({
  type: actionType.LOGIN_SUCCESS,
  userIsLoading: false,
  userIsAuthenticated: true,
  message
});

// Login failure action creator
export const onLoginFailure = message => ({
  type: actionType.LOGIN_FAILURE,
  userIsLoading: false,
  userIsAuthenticated: false,
  message
});

const onLoginUser = loginCreds =>
  (dispatch) => {
    dispatch(onLoginRequest(loginCreds));
    return axios.post('/api/user/signin', loginCreds)
    .then((loginRes) => {
      localStorage.setItem('userAuth', loginRes.data.authToken);
      dispatch(onLoginSuccess(loginRes.data.message));
      location.hash = '#dashboard';
    }).catch((loginRes) => {
      dispatch(onLoginFailure(loginRes.response.data.error.message));
    });
  };

export default onLoginUser;
