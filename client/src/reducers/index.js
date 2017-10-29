import { combineReducers } from 'redux';
import selectMemberReducer from './selectMemberReducer';
import authReducer from './authReducer';
import groupsReducer from './groupsReducer';
import groupMessagesReducer from './groupMessagesReducer';
import groupMembersReducer from './groupMembersReducer';
import createGroupReducer from './createGroupReducer';
import searchReducer from './searchReducer';
import passwordReducer from './passwordReducer';

const rootReducer = combineReducers({
  selectMember: selectMemberReducer,
  members: groupMembersReducer,
  messages: groupMessagesReducer,
  auth: authReducer,
  groups: groupsReducer,
  newGroup: createGroupReducer,
  searchResult: searchReducer,
  changePassword: passwordReducer,
});

export default rootReducer;
