import axios from 'axios';
import swal from 'sweetalert';
import actionType from '../actionTypes';

/**
 * Request to login user
 *
 * @return {object} action
 */
export const onLoginRequest = () => ({
  type: actionType.LOGIN_REQUEST
});

/**
 * Request to login user success
 *
 * @return {object} action
 *
 * @param {object} user
 */
export const onLoginSuccess = user => ({
  type: actionType.LOGIN_SUCCESS,
  user
});

/**
 * Request to login user failure
 *
 * @return {object} action
 */
export const onLoginFailure = () => ({
  type: actionType.LOGIN_FAILURE
});

/**
 * Allows a user login to the application
 *
 * @return {object} action
 *
 * @param {object} loginData
 */
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

