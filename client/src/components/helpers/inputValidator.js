const inputValidator = (userObject) => {
  let {
    username, email, password,
    confirmPassword, phone
  } = userObject;
  username = username.trim();
  email = email.trim();
  password = password.trim();
  confirmPassword = confirmPassword.trim();
  const alphanumeric = /^[a-zA-Z0-9_]*$/;
  phone = phone.trim();
  if (
    username === '' ||
    email === '' ||
    password === '' ||
    confirmPassword === '' ||
    phone === '') {
    return ({
      status: 'error',
      message: 'Error: One or more fields are empty'
    });
  } else if (username.length < 3) {
    return ({
      status: 'error',
      message: 'Error: username should be atleast 3 characters long'
    });
  } else if (username.length > 18) {
    return ({
      status: 'error',
      message: 'Error: Username should not exceed 18 characters'
    });
  } else if (!alphanumeric.test(username)) {
    return ({
      status: 'error',
      message:
      'Error: Username can contain only alphabets, numbers, or underscore'
    });
  } else if (password.length < 6) {
    return ({
      status: 'error',
      message: 'password should be up to 6 characters long' });
  } else if (password !== confirmPassword) {
    return ({
      status: 'error', message: 'password should be up to 6 characters long'
    });
  }
  // collect user input
  const userData = { username, email, password, phone };
};

export default inputValidator;
