import axios from 'axios';
import swal from 'sweetalert';
import actionType from '../actionTypes';

export const requestPassword = user => ({
  type: actionType.REQUEST_PASSWORD,
  passwordRequestIsLoading: true,
  user
});

export const requestPasswordSuccess = message => ({
  type: actionType.REQUEST_PASSWORD_SUCCESS,
  passwordRequestIsLoading: false,
  message
});

export const requestPasswordFailure = message => ({
  type: actionType.REQUEST_PASSWORD_FAILURE,
  passwordRequestIsLoading: false,
  message
});

const onRequestPassword = user =>
  (dispatch) => {
    dispatch(requestPassword(user));
    return axios.post('/api/user/request-password', user)
    .then((passRes) => {
      dispatch(requestPasswordSuccess(passRes.data.message));
      swal({
        text: passRes.data.message,
        icon: 'success'
      });
    }).catch((passRes) => {
      dispatch(requestPasswordFailure(passRes.response.data.error.message));
      swal({
        text: passRes.response.data.error.message,
        icon: 'error'
      });
    });
  };

export default onRequestPassword;

