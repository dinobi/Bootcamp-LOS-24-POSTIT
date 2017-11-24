/* eslint-disable no-useless-escape */
import errorResponse from './errorResponse';

const emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

/**
 * signupValidator
 * validates users input during signup process
 *
 * @returns {object} res - response object when check fails
 * @returns {string} validated - value when check passes
 * @param {object} req - response object
 * @param {object} res - response object
 */
const signupValidator = (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  let message;

  if (!username || username.trim() === '') {
    message = 'username field cannot be empty';
    return errorResponse(res, 400, message, null);
  }
  if (username.length > 18) {
    message = 'username should not exceed 18 characters';
    return errorResponse(res, 413, message, null);
  }
  if (!email || email.trim() === '') {
    message = 'email field cannot be empty';
    return errorResponse(res, 400, message, null);
  }
  if (!emailRE.test(email)) {
    message = 'Enter a valid email';
    return errorResponse(res, 400, message, null);
  }
  if (!password || password.trim() === '') {
    message = 'password field cannot be empty';
    return errorResponse(res, 400, message, null);
  }
  if (!phone || phone.trim() === '') {
    message = 'phone field cannot be empty';
    return errorResponse(res, 400, message, null);
  }
  return 'validated';
};

/**
 * loginValidator
 * validates users input during signin process
 *
 * @returns {object} res - response object when check fails
 * @returns {string} validated - value when check passes
 * @param {object} req - response object
 * @param {object} res - response object
 */
const loginValidator = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let message;
  if (!username || username.trim() === '') {
    message = 'username field cannot be empty';
    return errorResponse(res, 400, message, null);
  }

  if (!password || password.trim() === '') {
    message = 'password field cannot be empty';
    return errorResponse(res, 400, message, null);
  }

  return 'validated';
};

/**
 * loginValidator
 * validates users input for uniqueness and validity
 * during signup process
 *
 * @returns {object} res - response object when check fails
 * @returns {string} validated - value when check passes
 * @param {object} res - response object
 * @param {object} error - error response object
 */
const uniqueValidator = (res, error) => {
  const uniqueError = error.errors[0].message;
  let message;
  switch (uniqueError) {
    case 'username must be unique':
      message = 'Username already exists';
      return errorResponse(res, 409, message, null);
    case 'email must be unique':
      message = 'Email already exists';
      return errorResponse(res, 409, message, null);
    case 'Validation isEmail on email failed':
      message = 'Enter a valid email';
      return errorResponse(res, 400, message, null);
    case 'Validation not on phone failed':
      message = 'Enter a valid phone';
      return errorResponse(res, 400, message, null);
    default:
      return 'validated';
  }
};

/**
 * messageValidator
 * validates user created messages
 *
 * @returns {object} res - response object when check fails
 * @returns {string} validated - value when check passes
 * @param {string} message - user created message
 * @param {object} priority - user selected priority
 * @param {object} req - response object
 * @param {object} res - response object
 */
const messageValidator = (message, priority, req, res) => {
  let errorMessage;
  if (!message || message.trim() === '') {
    errorMessage = 'You forgot to include a message body';
    return errorResponse(res, 400, errorMessage, null);
  }
  if (!priority || priority === '') {
    errorMessage = 'Priority level is required';
    return errorResponse(res, 400, errorMessage, null);
  }
  if (priority !== undefined &&
    priority.toLowerCase() !== 'urgent'
    && priority.toLowerCase() !== 'critical'
    && priority.toLowerCase() !== 'normal') {
    errorMessage = 'Invalid priority level';
    return errorResponse(res, 400, errorMessage, null);
  }
  return 'validated';
};

export { signupValidator, loginValidator, uniqueValidator, messageValidator };
