import { REHYDRATE } from 'redux-persist/constants';
import actionType from '../actionTypes';
/**
 * users reducer to return user data
 * @param {object} state
 * @param {object} action
 * @return {object} action.payload
 */
const groupsReducer = (state = {
  groupsIsLoading: false,
  groups: []
}, action) => {
  switch (action.type) {
    case 'REHYDRATE':
      return { ...state, persistedState: action.groups };
    case actionType.LOAD_GROUPS_REQUEST:
      return Object.assign({}, state, {
        groupsIsLoading: true,
      });
    case actionType.LOAD_GROUPS_SUCCESS:
      return Object.assign({}, state, {
        groupsIsLoading: false,
        groups: action.groups
      });
    case actionType.LOAD_GROUPS_FAILURE:
      return Object.assign({}, state, {
        groupsIsLoading: false,
        message: action.message
      });
    default:
      return state;
  }
};

export default groupsReducer;
