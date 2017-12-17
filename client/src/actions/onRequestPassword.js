import axios from 'axios';
import swal from 'sweetalert';
import actionType from '../actionTypes';
import authError from '../components/helpers/authError';

/**
 * Request for new password
 *
 * @return {object} action
 */
export const requestPassword = () => ({
  type: actionType.REQUEST_PASSWORD
});

/**
 * Request for new password success
 *
 * @return {object} action
 */
export const requestPasswordSuccess = () => ({
  type: actionType.REQUEST_PASSWORD_SUCCESS
});

/**
 * Request for new password failure
 *
 * @return {object} action
 */
export const requestPasswordFailure = () => ({
  type: actionType.REQUEST_PASSWORD_FAILURE
});

/**
 * Allows a user request for new password
 *
 * @return {object} action
 *
 * @param {object} user
 */
const onRequestPassword = user =>
  (dispatch) => {
    dispatch(requestPassword());
    return axios.post('/api/user/request-password', user)
      .then((passwordRes) => {
        dispatch(requestPasswordSuccess());
        swal({
          text: passwordRes.data.message,
          icon: 'success',
          buttons: false,
          timer: 1600
        });
      }).catch((passwordRes) => {
        if (authError(passwordRes) !== 'notAuthError') {
          return;
        }
        dispatch(requestPasswordFailure());
        swal({
          text: passwordRes.response.data.error.message,
          icon: 'error',
          buttons: false,
          timer: 1600
        });
      });
  };

export default onRequestPassword;

