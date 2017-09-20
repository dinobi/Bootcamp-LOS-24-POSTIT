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

const loadGroupMembers = groupname =>
(dispatch) => {
  dispatch(loadGroupMembersRequest());
  let headers;
  apiHandler(`/api/groups/${groupname}/members`, '', 'get', headers)
  .then((groupMembersRes) => {
    console.log('Success response', groupMembersRes.data);
    dispatch(loadGroupMembersSuccess(groupMembersRes.data));
  }).catch((groupMembersRes) => {
    console.log('failure res', groupMembersRes);
    //dispatch(loadGroupMembersFailure(groupMembersRes.data.error.message));
  });
};

export default loadGroupMembers;
