import axios from 'axios';
import actionType from '../actionTypes';

export const onSignupRequest = () => ({
  type: actionType.SIGNUP_REQUEST,
  signupIsLoading: true,
});

export const onSignupSuccess = user => ({
  type: actionType.SIGNUP_SUCCESS,
  signupIsLoading: false,
  user
});

export const onSignupFailure = () => ({
  type: actionType.SIGNUP_FAILURE,
  signupIsLoading: false,
});

const onSignupUser = signupCredentials =>
  (dispatch) => {
    const Materialize = window.Materialize;
    dispatch(onSignupRequest(signupCredentials));
    return axios.post('/api/user/signup', signupCredentials)
    .then((signupResponse) => {
      dispatch(onSignupSuccess(signupResponse.data.userData));
      Materialize.toast(signupResponse.data.message, 2500, 'green');
      localStorage.setItem('userAuth', signupResponse.data.authToken);
      location.hash = '#dashboard';
    }).catch((errorResponse) => {
      dispatch(onSignupFailure());
      Materialize.toast(errorResponse.response.data.error.message, 2500, 'red');
    });
  };

export default onSignupUser;

