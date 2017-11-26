import swal from 'sweetalert';
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
    dispatch(onSignupRequest(signupCredentials));
    return axios.post('/api/user/signup', signupCredentials)
    .then((signupResponse) => {
      dispatch(onSignupSuccess(signupResponse.data.userData));
      swal({
        text: signupResponse.data.message,
        icon: 'success'
      });
      localStorage.setItem('userAuth', signupResponse.data.authToken);
      location.hash = '#';
    }).catch((errorResponse) => {
      dispatch(onSignupFailure());
      swal({
        text: errorResponse.response.data.error.message,
        icon: 'error'
      });
    });
  };

export default onSignupUser;

