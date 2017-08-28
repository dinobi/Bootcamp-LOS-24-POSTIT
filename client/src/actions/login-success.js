import actionType from '../constants';

const onLoginSuccess = bool => ({
  type: actionType.LOGIN_SUCCESS,
  payload: bool
});

export default onLoginSuccess;

