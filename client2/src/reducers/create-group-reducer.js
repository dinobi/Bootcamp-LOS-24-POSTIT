import actionType from '../actionTypes';

/**
 * users reducer to return user data
 * @param {state} - initial state object
 * @param {action} - action creator
 * @param {action.type} - action type
 * @return {object} - new state object
 */
const createGroupReducer = (state = {
  createGroupIsLoading: false,
  message: ''
}, action) => {
  switch (action.type) {
    case actionType.CREATE_GROUP_REQUEST:
      return Object.assign({}, state, {
        createGroupIsLoading: true,
      });
    case actionType.CREATE_GROUP_SUCCESS:
      return Object.assign({}, state, {
        createGroupIsLoading: false,
        message: action.message
      });
    case actionType.CREATE_GROUP_FAILURE:
      return Object.assign({}, state, {
        createGroupIsLoading: false,
        message: action.message
      });
    default:
      return state;
  }
};

export default createGroupReducer;
