import { REHYDRATE } from 'redux-persist/constants';
import actionType from '../actionTypes';

/**
 * users reducer to return user data
 * @param {state} - initial state object
 * @param {action} - action creator
 * @param {action.type} - action type
 * @return {object} - new state object
 */
const authReducer = (state = {
  userIsLoading: false,
  userIsAuthenticated: false,
  message: ''
}, action) => {
  switch (action.type) {
    case 'REHYDRATE':
      return { ...state, persistedState: action.userData };
    case actionType.SIGNUP_REQUEST:
      return Object.assign({}, state, {
        userIsLoading: true,
        userIsAuthenticated: false
      });
    case actionType.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        userIsLoading: false,
        userIsAuthenticated: true
      });
    case actionType.SIGNUP_FAILURE:
      return Object.assign({}, state, {
        userIsLoading: false,
        userIsAuthenticated: false,
        message: action.message
      });
    case actionType.LOGIN_REQUEST:
      return Object.assign({}, state, {
        userIsLoading: true,
        userIsAuthenticated: false,
      });
    case actionType.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        userIsLoading: false,
        userIsAuthenticated: true,
        message: action.message
      });
    case actionType.LOGIN_FAILURE:
      return Object.assign({}, state, {
        userIsLoading: false,
        userIsAuthenticated: false,
        message: action.message
      });
    case actionType.LOGOUT:
      return Object.assign({}, state, {
        userIsAuthenticated: false,
      });
    default:
      return state;
  }
};

export default authReducer;
