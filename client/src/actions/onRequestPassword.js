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
    return axios.post('/api/user/signup', signupCreds)
    .then((signupRes) => {
      dispatch(onSignupSuccess(signupRes.data.message));
      Materialize.toast(signupRes.data.message, 2500, 'green');
      localStorage.setItem('userAuth', signupRes.data.authToken);
      location.hash = '#dashboard';
    }).catch((signupRes) => {
      dispatch(onSignupFailure(signupRes.response.data.error.message));
      Materialize.toast(signupRes.response.data.error.message, 2500, 'red');
    });
  };

export default onSignupUser;

