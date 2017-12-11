import axios from 'axios';
import swal from 'sweetalert';
// There are three possible states for user login
// so we will need actions for each of them
import actionType from '../actionTypes';

// Login request action creator
export const onLoginRequest = () => ({
  type: actionType.LOGIN_REQUEST
});

// Login success action creator
export const onLoginSuccess = user => ({
  type: actionType.LOGIN_SUCCESS,
  user
});

// Login failure action creator
export const onLoginFailure = () => ({
  type: actionType.LOGIN_FAILURE
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
        location.hash = '#dashboard';
      }).catch((loginError) => {
        dispatch(onLoginFailure());
        swal(loginError.response.data.error.message, {
          timer: 1600,
          buttons: false
        });
      });
  };

export default onLoginUser;

