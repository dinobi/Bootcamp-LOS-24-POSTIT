import axios from 'axios';
import swal from 'sweetalert';
import actionType from '../actionTypes';
import authError from '../components/helpers/authError';

/**
 * Request to reset password
 *
 * @return {object} action
 */
export const resetPassword = () => ({
  type: actionType.RESET_PASSWORD
});

/**
 * Request to reset password success
 *
 * @return {object} action
 */
export const resetPasswordSuccess = () => ({
  type: actionType.RESET_PASSWORD_SUCCESS
});

/**
 * Request to reset password failure
 *
 * @return {object} action
 *
 * @param {object} groupname
 */
export const resetPasswordFailure = () => ({
  type: actionType.RESET_PASSWORD_FAILURE
});

/**
 * Allows a user make request to the server
 * to reset password
 *
 * @return {object} action
 *
 * @param {object} user
 * @param {object} hash
 */
const onResetPassword = (user, hash) =>
  (dispatch) => {
    dispatch(resetPassword());
    return axios.post(`/api/user/reset-password/${hash}`, user)
      .then((passwordRes) => {
        dispatch(resetPasswordSuccess());
        swal({
          text: passwordRes.data.message,
          icon: 'success',
          buttons: false,
          timer: 1600
        });
        location.hash = '#login';
      }).catch((passwordRes) => {
        if (authError(passwordRes) !== 'notAuthError') {
          return;
        }
        dispatch(resetPasswordFailure());
        swal({
          text: passwordRes.response.data.error.message,
          icon: 'error',
          buttons: false,
          timer: 1600
        });
      });
  };

export default onResetPassword;

