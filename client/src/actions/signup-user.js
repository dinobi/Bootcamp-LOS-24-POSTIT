import axios from 'axios';
import actionType from '../actionTypes';

export const onSignupRequest = signupCreds => ({
  type: actionType.SIGNUP_REQUEST,
  isLoading: true
});

export const onSignupSuccess = (userData, message) => ({
  type: actionType.SIGNUP_SUCCESS,
  isLoading: false,
  userData,
  message
});

export const onSignupFailure = message => ({
  type: actionType.SIGNUP_FAILURE,
  isLoading: false,
  message
});

const onSignupUser = signupCreds =>
  (dispatch) => {
    dispatch(onSignupRequest(signupCreds));
    return axios.post('/api/user/signup', signupCreds)
    .then((signupRes) => {
      console.log(JSON.stringify(signupRes.data));
      dispatch(onSignupSuccess(signupRes.data.userData, signupRes.data.message));
      location.hash = '#dashboard';
    }).catch((signupRes) => {
      dispatch(onSignupFailure(signupRes.response.data.error.message));
    });
  };

export default onSignupUser;

