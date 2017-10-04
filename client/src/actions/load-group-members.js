import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const loadGroupMembersRequest = () => ({
  type: actionType.LOAD_GROUP_MEMBERS_REQUEST,
  groupMembersIsLoading: true
});

export const loadGroupMembersSuccess = groupMembers => ({
  type: actionType.LOAD_GROUP_MEMBERS_SUCCESS,
  groupMembersIsLoading: false,
  groupMembers
});

export const loadGroupMembersFailure = message => ({
  type: actionType.LOAD_GROUP_MEMBERS_FAILURE,
  groupMembersIsLoading: false,
  message
});

const loadGroupMembers = () =>
(dispatch) => {
  dispatch(loadGroupMembersRequest());
  const groupname = location.href.split('/')[location.href.split('/').length - 1];
  let headers;
  apiHandler(`/api/groups/${groupname}/members`, '', 'get', headers)
  .then((groupMembersRes) => {
    dispatch(loadGroupMembersSuccess(groupMembersRes.data));
  }).catch((groupMembersRes) => {
    dispatch(loadGroupMembersFailure(groupMembersRes));
  });
};

export default loadGroupMembers;
