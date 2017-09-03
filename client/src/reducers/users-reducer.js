/**
 * users reducer to return user data
 * @param {object} state
 * @param {object} action
 * @return {object} action.payload
 */
const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.payload;
    case 'LOGIN_SUCCESS':
      return action.payload;
    case 'LOGIN_ERROR':
      return action.payload;
    case 'LOGOUT_USER':
      return {};
    default:
      return state;
  }
};

export default usersReducer;
