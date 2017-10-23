import axios from 'axios';
import actionType from '../actionTypes';

export const onSignupRequest = signupCreds => ({
  type: actionType.SIGNUP_REQUEST,
  isLoading: true,
  signupCreds
});

export const onSignupSuccess = message => ({
  type: actionType.SIGNUP_SUCCESS,
  isLoading: false,
  message
});

export const onSignupFailure = message => ({
  type: actionType.SIGNUP_FAILURE,
  isLoading: false,
  message
});

const onSignupUser = signupCreds =>
  (dispatch) => {
    const Materialize = window.Materialize;
    dispatch(onSignupRequest(signupCreds));
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

