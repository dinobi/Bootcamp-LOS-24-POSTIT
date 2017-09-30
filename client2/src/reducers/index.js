import { combineReducers } from 'redux';
import selectMemberReducer from './select-member-reducer';
import toastReducer from './toast-reducer'
import authReducer from './auth-reducer';
import signupReducer from './signup-reducer';
import groupsReducer from './groups-reducer';
import groupMessagesReducer from './group-messages-reducer';
import groupMembersReducer from './group-members-reducer';
import createGroupReducer from './create-group-reducer';

const rootReducer = combineReducers({
  selectMember: selectMemberReducer,
  members: groupMembersReducer,
  messages: groupMessagesReducer,
  toasts: toastReducer,
  auth: authReducer,
  signup: signupReducer,
  groups: groupsReducer,
  newGroup: createGroupReducer
});

export default rootReducer;
