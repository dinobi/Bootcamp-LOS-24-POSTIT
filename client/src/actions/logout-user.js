import actionType from '../constants';

const onLogoutUser = (user) => {
  console.log('Logout button was clicked');
  return {
    type: actionType.LOGOUT_USER,
    payload: user
  };
};

export default onLogoutUser;

