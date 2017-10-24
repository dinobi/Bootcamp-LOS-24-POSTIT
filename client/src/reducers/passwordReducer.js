import actionType from '../actionTypes';

/**
 * password reducer to handles reset and request password action
 * @param {state} state - initial app state object
 * @param {action} action - action creator to update state
 * @param {action.type} action.type - action type to listen for
 * @return {object} - new state object
 */
const passwordReducer = (state = {
  passwordRequestIsLoading: false,
  passwordResetIsLoading: false,
  message: ''
}, action) => {
  switch (action.type) {
    case actionType.REQUEST_PASSWORD:
      return Object.assign({}, state, {
        passwordRequestIsLoading: true
      });
    case actionType.REQUEST_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        passwordRequestIsLoading: false,
        message: action.message
      });
    case actionType.REQUEST_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        passwordRequestIsLoading: false,
        message: action.message
      });
    case actionType.RESET_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        passwordResetIsLoading: true,
      });
    case actionType.RESET_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        passwordResetIsLoading: false,
        message: action.message
      });
    case actionType.RESET_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        passwordResetIsLoading: false,
        message: action.message
      });
    default:
      return state;
  }
};

export default passwordReducer;
