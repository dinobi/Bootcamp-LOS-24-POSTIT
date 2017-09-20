import actionType from '../actionTypes';

/**
 * users reducer to return user data
 * @param {state} - initial state object
 * @param {action} - action creator
 * @param {action.type} - action type
 * @return {object} - new state object
 */
const signupReducer = (state = {
  signupIsLoading: false,
}, action) => {
  switch (action.type) {
    case actionType.SIGNUP_REQUEST:
      return Object.assign({}, state, {
        signupIsLoading: true,
      });
    case actionType.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        signupIsLoading: false,
        message: action.message
      });
    case actionType.SIGNUP_FAILURE:
      return Object.assign({}, state, {
        userIsLoading: false,
        message: action.message
      });
    default:
      return state;
  }
};

export default signupReducer;
