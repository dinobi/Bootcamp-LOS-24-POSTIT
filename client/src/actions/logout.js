const Logout = (user) => {
  return {
    type: 'LOGOUT_USER',
    user
  };
};

export default Logout;
