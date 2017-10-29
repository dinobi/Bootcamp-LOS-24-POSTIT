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
      swal({
        title: `Welcome back ${loginData.username}!`,
        icon: 'success'
      });
      location.hash = '#dashboard';
    }).catch((loginError) => {
      dispatch(onLoginFailure());
      swal(loginError.response.data.error.message);
    });
  };

export default onLoginUser;

