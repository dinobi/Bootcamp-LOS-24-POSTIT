import actionType from '../actionTypes';
/**
 * users reducer to return user data
 * @param {object} state
 * @param {object} action
 * @return {object} action.payload
 */
const groupsReducer = (state = {
  groupsIsLoading: false,
  createGroupIsLoading: false,
  deleteGroupIsLoading: false,
  modalOpened: false,
  groups: []
}, action) => {
  switch (action.type) {
    case actionType.LOAD_GROUPS_REQUEST:
      return { ...state,
        groupsIsLoading: true,
      };
    case actionType.LOAD_GROUPS_SUCCESS:
      return { ...state,
        groupsIsLoading: false,
        groups: action.groups
      };
    case actionType.LOAD_GROUPS_FAILURE:
      return { ...state,
        groupsIsLoading: false
      };
    case actionType.CREATE_GROUP_REQUEST:
      return { ...state,
        createGroupIsLoading: true
      };
    case actionType.CREATE_GROUP_SUCCESS:
      return { ...state,
        createGroupIsLoading: false,
        modalOpened: action.modalOpened,
        groups: [...state.groups, action.group]
      };
    case actionType.CREATE_GROUP_FAILURE:
      return { ...state,
        createGroupIsLoading: false
      };
    case actionType.DELETE_GROUP_REQUEST:
      return { ...state,
        deleteGroupIsLoading: true
      };
    case actionType.DELETE_GROUP_SUCCESS:
      return { ...state,
        deleteGroupIsLoading: false,
        groups:
        [
          ...state.groups
          .filter(group => group.groupname !== action.group.groupname)
        ]
      };
    case actionType.DELETE_GROUP_FAILURE:
      return { ...state,
        deleteGroupIsLoading: false
      };
    default:
      return state;
  }
};

export default groupsReducer;

