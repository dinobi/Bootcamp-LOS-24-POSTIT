import { combineReducers } from 'redux';
import selectMemberReducer from './select-member-reducer';
import authReducer from './auth-reducer';
import groupsReducer from './groups-reducer';
import groupMessagesReducer from './groupMessagesReducer';
import groupMembersReducer from './groupMembersReducer';
import createGroupReducer from './create-group-reducer';
import sendMessageReducer from './send-message-reducer';
import searchReducer from './search-reducer';
import passwordReducer from './passwordReducer';

const rootReducer = combineReducers({
  selectMember: selectMemberReducer,
  members: groupMembersReducer,
  messages: groupMessagesReducer,
  auth: authReducer,
  groups: groupsReducer,
  newGroup: createGroupReducer,
  newMessage: sendMessageReducer,
  searchResult: searchReducer,
  changePassword: passwordReducer,
});

export default rootReducer;
