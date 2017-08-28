import actionType from '../constants';

const onLoginError = bool => ({
  type: actionType.LOGIN_ERROR,
  payload: bool
});

export default onLoginError;

