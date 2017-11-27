import axios from 'axios';
import swal from 'sweetalert';
// There are three possible states for user login
// so we will need actions for each of them
import actionType from '../actionTypes';

// Login request action creator
export const onLoginRequest = () => ({
  type: actionType.LOGIN_REQUEST,
  userIsLoading: true,
  userIsAuthenticated: false
});

// Login success action creator
export const onLoginSuccess = user => ({
  type: actionType.LOGIN_SUCCESS,
  userIsLoading: false,
  userIsAuthenticated: true,
  user
});

// Login failure action creator
export const onLoginFailure = () => ({
  type: actionType.LOGIN_FAILURE,
  userIsLoading: false,
  userIsAuthenticated: false
});

const onLoginUser = loginData =>
  (dispatch) => {
    dispatch(onLoginRequest());
    return axios.post('/api/user/signin', loginData)
    .then((loginResponse) => {
      localStorage.setItem('userAuth', loginResponse.data.authToken);
      dispatch(onLoginSuccess(loginResponse.data.userData));
      swal(`Welcome back ${loginData.username}!`, {
        timer: 1600,
        icon: 'success',
        buttons: false
      });
      const currentLocation =
      location.href.split('#')[1];
      const memory = currentLocation !== '/login' ?
      currentLocation : 'dashboard';
      location.hash = `#${memory}`;
    }).catch((loginError) => {
      dispatch(onLoginFailure());
      const currentLocation =
      location.href.split('/')[location.href.split('/').length - 1];
      if (currentLocation !== 'login') {
        localStorage.clear();
        location.hash = '#login';
      }
      swal(loginError.response.data.error.message, {
        timer: 1600,
        buttons: false
      });
    });
  };

export default onLoginUser;

