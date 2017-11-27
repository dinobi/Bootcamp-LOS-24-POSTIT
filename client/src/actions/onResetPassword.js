import axios from 'axios';
import swal from 'sweetalert';
import actionType from '../actionTypes';

export const resetPassword = user => ({
  type: actionType.RESET_PASSWORD,
  passwordResetIsLoading: true,
  user
});

export const resetPasswordSuccess = message => ({
  type: actionType.RESET_PASSWORD_SUCCESS,
  passwordResetIsLoading: false,
  message
});

export const resetPasswordFailure = message => ({
  type: actionType.RESET_PASSWORD_FAILURE,
  passwordResetIsLoading: false,
  message
});

const onResetPassword = user =>
  (dispatch) => {
    const hash = location.href.split('/')[location.href.split('/').length - 1];
    dispatch(resetPassword(user));
    return axios.post(`/api/user/reset-password/${hash}`, user)
    .then((passRes) => {
      dispatch(resetPasswordSuccess(passRes.data.message));
      swal({
        text: passRes.data.message,
        icon: 'success',
        buttons: false,
        timer: 1600
      });
      location.hash = '#login';
    }).catch((passRes) => {
      dispatch(resetPasswordFailure(passRes.response.data.error.message));
      swal({
        text: passRes.response.data.error.message,
        icon: 'error',
        buttons: false,
        timer: 1600
      });
    });
  };

export default onResetPassword;

