const filterUser = user => ({
  firstname: user.firstname,
  lastname: user.lastname,
  username: user.username,
  email: user.email,
  phone: user.phone
});

export default filterUser;
