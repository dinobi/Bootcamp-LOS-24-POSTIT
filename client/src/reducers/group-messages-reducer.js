import { REHYDRATE } from 'redux-persist/constants';
import actionType from '../actionTypes';
/**
 * users reducer to return user data
 * @param {object} state
 * @param {object} action
 * @return {object} action.payload
 */
const groupMessagesReducer = (state = {
  groupMessagesIsLoading: false,
  groupMessages: []
}, action) => {
  switch (action.type) {
    case 'REHYDRATE':
      return { ...state, persistedState: action.groupMessages };
    case actionType.LOAD_GROUP_MESSAGES_REQUEST:
      return Object.assign({}, state, {
        groupsMessagesIsLoading: true,
      });
    case actionType.LOAD_GROUP_MESSAGES_SUCCESS:
      return Object.assign({}, state, {
        groupsMessagesIsLoading: false,
        groupMessages: action.groupMessages
      });
    case actionType.LOAD_GROUP_MESSAGES_FAILURE:
      return Object.assign({}, state, {
        groupMessagesIsLoading: false,
        message: action.message
      });
    default:
      return state;
  }
};

export default groupMessagesReducer;
