import actionType from '../actionTypes';

const createGroupReducer = (state = {
  createGroupIsLoading: false,
  message: ''
}, action) => {
  switch (action.type) {
    case actionType.CREATE_GROUP_REQUEST:
      return Object.assign({}, state, {
        createGroupIsLoading: true
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
