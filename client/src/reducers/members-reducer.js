/**
 * members reducer to return group members data
 * 
 */
const membersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MEMBER_CLICKED':
      return action.payload;
    case 'DELETE_MEMBER':
      return {};
    default:
      return state;
  }
};

export default membersReducer;
