import swal from 'sweetalert';
import axios from 'axios';
import actionType from '../actionTypes';

export const onSignupRequest = () => ({
  type: actionType.SIGNUP_REQUEST
});

export const onSignupSuccess = user => ({
  type: actionType.SIGNUP_SUCCESS,
  user
});

export const onSignupFailure = () => ({
  type: actionType.SIGNUP_FAILURE
});

const onSignupUser = signupCredentials =>
  (dispatch) => {
    dispatch(onSignupRequest());
    return axios.post('/api/user/signup', signupCredentials)
      .then((signupResponse) => {
        dispatch(onSignupSuccess(signupResponse.data.userData));
        swal(signupResponse.data.message, {
          icon: 'success',
          buttons: false,
          timer: 1600,
        });
        localStorage.setItem('userAuth', signupResponse.data);
        location.hash = '#';
      }).catch((errorResponse) => {
        dispatch(onSignupFailure());
        swal(errorResponse.response.data.error.message, {
          buttons: false,
          timer: 1600,
        });
      });
  };

export default onSignupUser;

