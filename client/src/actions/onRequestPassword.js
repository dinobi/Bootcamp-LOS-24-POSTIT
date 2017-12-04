import axios from 'axios';
import swal from 'sweetalert';
import actionType from '../actionTypes';
import authError from '../components/helpers/authError';

export const requestPassword = () => ({
  type: actionType.REQUEST_PASSWORD
});

export const requestPasswordSuccess = () => ({
  type: actionType.REQUEST_PASSWORD_SUCCESS
});

export const requestPasswordFailure = () => ({
  type: actionType.REQUEST_PASSWORD_FAILURE
});

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

