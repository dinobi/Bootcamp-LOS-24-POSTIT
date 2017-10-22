import actionType from '../actionTypes';

/**
 * members reducer to return member data
 * @param {state}  state initial state object
 * @param {action} action - some actions
 * @param {action.type} action.type some action types
 * @return {object} - new state object
 */
const editMembersReducer = (state = {
  addMemberIsLoading: false,
  member,
  message: ''
}, action) => {
  switch (action.type) {
    case actionType.ADD_MEMBER_REQUEST:
      return Object.assign({}, state, {
        addMemberIsLoading: true,
      });
    case actionType.ADD_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        addMemberIsLoading: false,
        message: action.message
      });
    case actionType.ADD_MEMBER_FAILURE:
      return Object.assign({}, state, {
        addMemberIsLoading: false,
        message: action.message
      });
    case actionType.REMOVE_MEMBER_REQUEST:
      return Object.assign({}, state, {
        removeMemberIsLoading: true,
      });
    case actionType.REMOVE_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        removeMemberIsLoading: false,
        message: action.message
      });
    case actionType.REMOVE_MEMBER_FAILURE:
      return Object.assign({}, state, {
        removeMemberIsLoading: false,
        message: action.message
      });
    default:
      return state;
  }
};

export default editMembersReducer;
