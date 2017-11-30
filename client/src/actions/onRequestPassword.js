import axios from 'axios';
import swal from 'sweetalert';
import actionType from '../actionTypes';
import authError from '../components/helpers/authError';

export const requestPassword = user => ({
  type: actionType.REQUEST_PASSWORD,
  user
});

export const requestPasswordSuccess = message => ({
  type: actionType.REQUEST_PASSWORD_SUCCESS,
  message
});

export const requestPasswordFailure = message => ({
  type: actionType.REQUEST_PASSWORD_FAILURE,
  message
});

const onRequestPassword = user =>
  (dispatch) => {
    dispatch(requestPassword(user));
    return axios.post('/api/user/request-password', user)
      .then((passwordRes) => {
        dispatch(requestPasswordSuccess(passwordRes.data.message));
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
        dispatch(requestPasswordFailure(
          passwordRes.response.data.error.message
        ));
        swal({
          text: passwordRes.response.data.error.message,
          icon: 'error',
          buttons: false,
          timer: 1600
        });
      });
  };

export default onRequestPassword;

