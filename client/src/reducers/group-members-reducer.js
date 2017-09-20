import { REHYDRATE } from 'redux-persist/constants';
import actionType from '../actionTypes';
/**
 * users reducer to return user data
 * @param {object} state
 * @param {object} action
 * @return {object} action.payload
 */
const groupMembersReducer = (state = {
  groupMembersIsLoading: false,
  groupMembers: {}
}, action) => {
  switch (action.type) {
    case 'REHYDRATE':
      return { ...state, persistedState: action.groupMembers };
    case actionType.LOAD_GROUP_MEMBERS_REQUEST:
      return Object.assign({}, state, {
        groupsMembersIsLoading: true,
      });
    case actionType.LOAD_GROUP_MEMBERS_SUCCESS:
      return Object.assign({}, state, {
        groupsMembersIsLoading: false,
        groupMembers: action.groupMembers
      });
    case actionType.LOAD_GROUP_MEMBERS_FAILURE:
      return Object.assign({}, state, {
        groupMembersIsLoading: false,
        message: action.message
      });
    default:
      return state;
  }
};

export default groupMembersReducer;
