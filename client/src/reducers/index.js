import { combineReducers } from 'redux';
import membersReducer from './members-reducer';

const oneReducer = combineReducers({
  member: membersReducer
});

export default oneReducer;