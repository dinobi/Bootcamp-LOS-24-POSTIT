import axios from 'axios';
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
    const Materialize = window.Materialize;
    const hash = location.href.split('/')[location.href.split('/').length - 1];
    dispatch(resetPassword(user));
    return axios.post(`/api/user/reset-password/${hash}`, user)
    .then((passRes) => {
      dispatch(resetPasswordSuccess(passRes.data.message));
      Materialize.toast(passRes.data.message, 2500, 'green');
      location.hash = '#login';
    }).catch((passRes) => {
      dispatch(resetPasswordFailure(passRes.response.data.error.message));
      Materialize.toast(passRes.response.data.error.message, 2500, 'red');
    });
  };

export default onResetPassword;

