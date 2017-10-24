import axios from 'axios';
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
    const Materialize = window.Materialize;
    dispatch(requestPassword(user));
    return axios.post('/api/user/request-password', user)
    .then((passRes) => {
      dispatch(requestPasswordSuccess(passRes.data.message));
      Materialize.toast(passRes.data.message, 2500, 'green');
    }).catch((passRes) => {
      dispatch(requestPasswordFailure(passRes.response.data.error.message));
      Materialize.toast(passRes.response.data.error.message, 2500, 'red');
    });
  };

export default onRequestPassword;

