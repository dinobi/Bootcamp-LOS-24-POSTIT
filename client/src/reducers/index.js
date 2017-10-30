import { combineReducers } from 'redux';
import selectMemberReducer from './selectMemberReducer';
import authReducer from './authReducer';
import groupsReducer from './groupsReducer';
import groupMessagesReducer from './groupMessagesReducer';
import groupMembersReducer from './groupMembersReducer';
import searchReducer from './searchReducer';
import passwordReducer from './passwordReducer';

const rootReducer = combineReducers({
  selectMember: selectMemberReducer,
  members: groupMembersReducer,
  messages: groupMessagesReducer,
  auth: authReducer,
  groups: groupsReducer,
  searchResult: searchReducer,
  changePassword: passwordReducer,
});

export default rootReducer;
