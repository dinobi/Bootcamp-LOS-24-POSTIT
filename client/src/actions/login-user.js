import actionType from '../constants';

const onLoginUser = (user) => {
  console.log('Login button was clicked');
  return {
    type: actionType.LOGIN_USER,
    payload: user
  };
};

export default onLoginUser;

