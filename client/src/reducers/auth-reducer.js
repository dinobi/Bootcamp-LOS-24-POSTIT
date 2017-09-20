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
  userData: {}
}, action) => {
  switch (action.type) {
    case 'REHYDRATE':
      return { ...state, persistedState: action.userData };
    case actionType.LOGIN_REQUEST:
      return Object.assign({}, state, {
        userIsLoading: true,
        userIsAuthenticated: false,
      });
    case actionType.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        userIsLoading: false,
        userIsAuthenticated: true,
        userData: action.userData
      });
    case actionType.LOGIN_FAILURE:
      return Object.assign({}, state, {
        userIsLoading: false,
        userIsAuthenticated: false,
        message: action.message
      });
    case actionType.LOGOUT_REQUEST:
      return Object.assign({}, state, {
        userIsLoading: true,
        userIsAuthenticated: true
      });
    case actionType.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        userIsLoading: false,
        userIsAuthenticated: false,
        message: action.message
      });
    default:
      return state;
  }
};

export default authReducer;
