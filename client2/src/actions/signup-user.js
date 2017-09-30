import axios from 'axios';
import actionType from '../actionTypes';

export const onSignupRequest = userData => ({
  type: actionType.SIGNUP_REQUEST,
  isLoading: true,
  userData
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

const onSignupUser = userData =>
  (dispatch) => {
    dispatch(onSignupRequest(userData));
    return axios.post('/api/user/signup', userData)
    .then((signupRes) => {
      console.log(JSON.stringify(signupRes.data.message));
      dispatch(onSignupSuccess(signupRes.data.message));
      // this.props.onLoginRequest({username: JSON.stringify(signupRes.data.userData.firstname) });
      // localStorage.setItem('userAuth', signupRes.data.token);
      // location.hash = '#dashboard';
    }).catch((signupRes) => {
      dispatch(onSignupFailure(signupRes.response.data.error.message));
    });
  };

export default onSignupUser;

