import swal from 'sweetalert';
import axios from 'axios';
import actionType from '../actionTypes';

/**
 * Request to signup
 *
 * @return {object} action
 */
export const onSignupRequest = () => ({
  type: actionType.SIGNUP_REQUEST
});

/**
 * Request to signup success
 *
 * @return {object} action
 *
 * @param {object} user
 */
export const onSignupSuccess = user => ({
  type: actionType.SIGNUP_SUCCESS,
  user
});

/**
 * Request to signup failure
 *
 * @return {object} action
 */
export const onSignupFailure = () => ({
  type: actionType.SIGNUP_FAILURE
});

/**
 * Allows a user create new account
 *
 * @return {object} action
 *
 * @param {object} signupCredentials
 */
const onSignupUser = signupCredentials =>
  (dispatch) => {
    dispatch(onSignupRequest());
    return axios.post('/api/user/signup', signupCredentials)
      .then((signupResponse) => {
        dispatch(onSignupSuccess(signupResponse.data.userData));
        swal(signupResponse.data.message, {
          icon: 'success',
          buttons: false,
          timer: 1600,
        });
        localStorage.setItem('userAuth', signupResponse.data.authToken);
        location.hash = '#';
      }).catch((errorResponse) => {
        dispatch(onSignupFailure());
        swal(errorResponse.response.data.error.message, {
          buttons: false,
          timer: 1600,
        });
      });
  };

export default onSignupUser;

