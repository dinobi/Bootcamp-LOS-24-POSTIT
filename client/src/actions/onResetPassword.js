import axios from 'axios';
import swal from 'sweetalert';
import actionType from '../actionTypes';
import authError from '../components/helpers/authError';

export const resetPassword = user => ({
  type: actionType.RESET_PASSWORD,
  user
});

export const resetPasswordSuccess = message => ({
  type: actionType.RESET_PASSWORD_SUCCESS,
  message
});

export const resetPasswordFailure = message => ({
  type: actionType.RESET_PASSWORD_FAILURE,
  message
});

const onResetPassword = user =>
  (dispatch) => {
    const hash = location.href.split('/')[location.href.split('/').length - 1];
    dispatch(resetPassword(user));
    return axios.post(`/api/user/reset-password/${hash}`, user)
      .then((passwordRes) => {
        if (authError(passwordRes) !== 'notAuthError') {
          return;
        }
        dispatch(resetPasswordSuccess(passwordRes.data.message));
        swal({
          text: passwordRes.data.message,
          icon: 'success',
          buttons: false,
          timer: 1600
        });
        location.hash = '#login';
      }).catch((passwordRes) => {
        dispatch(resetPasswordFailure(passwordRes.response.data.error.message));
        swal({
          text: passwordRes.response.data.error.message,
          icon: 'error',
          buttons: false,
          timer: 1600
        });
      });
  };

export default onResetPassword;

