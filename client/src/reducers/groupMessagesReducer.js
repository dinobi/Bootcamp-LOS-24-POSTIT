import actionType from '../actionTypes';
/**
 * users reducer to return user data
 *
 * @param {object} state
 * @param {object} action
 *
 * @return {object} action.payload
 */
const groupMessagesReducer = (state = {
  groupMessagesIsLoading: false,
  sendMessageIsLoading: false,
  groupMessages: []
}, action) => {
  switch (action.type) {
    case actionType.SEND_MESSAGE_REQUEST:
      return { ...state,
        sendMessageIsLoading: true
      };
    case actionType.SEND_MESSAGE_SUCCESS:
      return { ...state,
        sendMessageIsLoading: false,
        groupMessages: [...state.groupMessages, action.message]
      };
    case actionType.SEND_MESSAGE_FAILURE:
      return { ...state,
        sendMessageIsLoading: false
      };
    case actionType.LOAD_GROUP_MESSAGES_REQUEST:
      return { ...state,
        groupMessagesIsLoading: true,
      };
    case actionType.LOAD_GROUP_MESSAGES_SUCCESS:
      return { ...state,
        groupMessagesIsLoading: false,
        groupMessages: action.groupMessages
      };
    case actionType.LOAD_GROUP_MESSAGES_FAILURE:
      return { ...state,
        groupMessagesIsLoading: false
      };
    default:
      return state;
  }
};

export default groupMessagesReducer;
