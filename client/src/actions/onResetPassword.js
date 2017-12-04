import axios from 'axios';
import swal from 'sweetalert';
import actionType from '../actionTypes';
import authError from '../components/helpers/authError';

export const resetPassword = () => ({
  type: actionType.RESET_PASSWORD
});

export const resetPasswordSuccess = () => ({
  type: actionType.RESET_PASSWORD_SUCCESS
});

export const resetPasswordFailure = () => ({
  type: actionType.RESET_PASSWORD_FAILURE
});

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

