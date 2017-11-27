import { combineReducers } from 'redux';
import selectMemberReducer from './selectMemberReducer';
import authReducer from './authReducer';
import groupsReducer from './groupsReducer';
import groupMessagesReducer from './groupMessagesReducer';
import groupMembersReducer from './groupMembersReducer';
import passwordReducer from './passwordReducer';

const rootReducer = combineReducers({
  selectMember: selectMemberReducer,
  members: groupMembersReducer,
  messages: groupMessagesReducer,
  auth: authReducer,
  groups: groupsReducer,
  changePassword: passwordReducer,
});

export default rootReducer;
