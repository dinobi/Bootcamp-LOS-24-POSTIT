import { combineReducers } from 'redux';
import membersReducer from './members-reducer';
import usersReducer from './users-reducer';

const rootReducer = combineReducers({
  members: membersReducer,
  users: usersReducer
});

export default rootReducer;
