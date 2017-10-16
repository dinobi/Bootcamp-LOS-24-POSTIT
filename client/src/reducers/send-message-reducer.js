import actionType from '../actionTypes';

/**
 *
 * @param {*} state
 * @param {*} action
 * @return {*} object
 */
const sendMessageReducer = (state = {
  messageIsLoading: false,
  message: {},
  error: ''
}, action) => {
  switch (action.type) {
    case actionType.SEND_MESSAGE_REQUEST:
      return Object.assign({}, state, {
        messageIsLoading: true
      });
    case actionType.SEND_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        messageIsLoading: false,
        message: action.message
      });
    case actionType.SEND_MESSAGE_FAILURE:
      return Object.assign({}, state, {
        messageIsLoading: false,
        error: action.messageError
      });
    default:
      return state;
  }
};

export default sendMessageReducer;
