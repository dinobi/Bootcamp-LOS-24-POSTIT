import actionType from '../actionTypes';
/**
 * users reducer to return user data
 *
 * @param {object} state
 * @param {object} action
 *
 * @return {object} action.payload
 */
const groupMembersReducer = (state = {
  groupMembersIsLoading: false,
  addMemberIsLoading: false,
  removeMemberIsLoading: false,
  groupMembers: []
}, action) => {
  switch (action.type) {
    case actionType.LOAD_GROUP_MEMBERS_REQUEST:
      return { ...state,
        groupMembersIsLoading: true,
      };
    case actionType.LOAD_GROUP_MEMBERS_SUCCESS:
      return { ...state,
        groupMembersIsLoading: false,
        groupMembers: action.groupMembers
      };
    case actionType.LOAD_GROUP_MEMBERS_FAILURE:
      return { ...state,
        groupMembersIsLoading: false,
      };
    case actionType.ADD_MEMBER_REQUEST:
      return { ...state,
        addMemberIsLoading: true,
      };
    case actionType.ADD_MEMBER_SUCCESS:
      return { ...state,
        addMemberIsLoading: false,
        groupMembers: [...state.groupMembers, action.member]
      };
    case actionType.ADD_MEMBER_FAILURE:
      return { ...state,
        addMemberIsLoading: false
      };
    case actionType.REMOVE_MEMBER_REQUEST:
      return { ...state,
        removeMemberIsLoading: true,
      };
    case actionType.REMOVE_MEMBER_SUCCESS:
      return { ...state,
        removeMemberIsLoading: false,
        groupMembers:
        [
          ...state.groupMembers
          .filter(member => member.username !== action.member)
        ]
      };
    case actionType.REMOVE_MEMBER_FAILURE:
      return { ...state,
        removeMemberIsLoading: false
      };
    default:
      return state;
  }
};

export default groupMembersReducer;
