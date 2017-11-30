import actionType from '../actionTypes';

/**
 * users reducer to return user data
 * @param {state} state - initial state object
 * @param {action} action - action creator
 * @param {action.type} action.type - action type
 * @return {object} - new state object
 */
const authReducer = (state = {
  userIsLoading: false,
  userIsAuthenticated: false,
  user: {}
}, action) => {
  switch (action.type) {
    case actionType.SIGNUP_REQUEST:
      return {
        ...state,
        userIsLoading: true,
        userIsAuthenticated: false
      };
    case actionType.SIGNUP_SUCCESS:
      return {
        ...state,
        userIsLoading: false,
        userIsAuthenticated: true,
        user: action.user
      };
    case actionType.SIGNUP_FAILURE:
      return {
        ...state,
        userIsLoading: false,
        userIsAuthenticated: false
      };
    case actionType.LOGIN_REQUEST:
      return {
        ...state,
        userIsLoading: true,
        userIsAuthenticated: false,
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        userIsLoading: false,
        userIsAuthenticated: true,
        user: action.user
      };
    case actionType.LOGIN_FAILURE:
      return {
        ...state,
        userIsLoading: false
      };
    case actionType.LOGOUT:
      return {
        ...state,
        userIsAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
};

export default authReducer;
