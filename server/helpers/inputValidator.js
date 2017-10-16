/* eslint-disable no-useless-escape */

const emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

const signupValidator = (req, res) => {
  if (!req.body.firstname || req.body.firstname.trim() === '') {
    return res.status(400)
    .send({
      error: { message: 'firstname field cannot be empty' }
    });
  }
  if (!/^[a-zA-Z]*$/.test(req.body.firstname)) {
    return res.status(400)
    .send({
      error: { message: 'Firstname cannot contain digits' }
    });
  }
  if (!req.body.lastname || req.body.lastname.trim() === '') {
    return res.status(400)
    .send({
      error: { message: 'lastname field cannot be empty' }
    });
  }

  if (!/^[a-zA-Z]*$/.test(req.body.lastname)) {
    return res.status(400)
    .send({
      error: { message: 'Lastname cannot contain digits' }
    });
  }

  if (!req.body.username || req.body.username.trim() === '') {
    return res.status(400)
    .send({
      error: { message: 'username field cannot be empty' }
    });
  }

  if (!req.body.email || req.body.email.trim() === '') {
    return res.status(400)
    .send({
      error: { message: 'email field cannot be empty' }
    });
  }

  if (!emailRE.test(req.body.email)) {
    return res.status(400)
    .send({
      error: { message: 'Enter a valid email' }
    });
  }

  if (!req.body.password || req.body.password.trim() === '') {
    return res.status(400)
    .send({
      error: { message: 'password field cannot be empty' }
    });
  }

  if (!req.body.phone || req.body.phone.trim() === '') {
    return res.status(400)
    .send({
      error: { message: 'phone field cannot be empty' }
    });
  }

  return 'validated';
};

const loginValidator = (req, res) => {
  if (!req.body.username || req.body.username.trim() === '') {
    return res.status(400)
    .send({
      error: { message: 'username field cannot be empty' }
    });
  }

  if (!req.body.password || req.body.password.trim() === '') {
    return res.status(400)
    .send({
      error: { message: 'password field cannot be empty' }
    });
  }

  return 'validated';
};

const uniqueValidator = (res, error) => {
  if (error.errors[0].message === 'username must be unique') {
    return res.status(409).send({
      error: { message: 'Username already exists', status: 409 }
    });
  } else if (error.errors[0].message === 'email must be unique') {
    return res.status(409).send({
      error: { message: 'Email already exists', status: 409 }
    });
  }
  return 'validated';
};

export { signupValidator, loginValidator, uniqueValidator };
