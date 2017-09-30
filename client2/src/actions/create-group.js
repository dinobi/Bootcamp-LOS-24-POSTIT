import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const onCreateGroupRequest = (groupDasta) => ({
  type: actionType.CREATE_GROUP_REQUEST,
  createGroupIsLoading: true
});

export const onCreateGroupSuccess = message => ({
  type: actionType.CREATE_GROUP_SUCCESS,
  creataGroupIsLoading: false,
  message
});

export const onCreateGroupFailure = message => ({
  type: actionType.CREATE_GROUP_FAILURE,
  groupsIsLoading: false,
  message
});

const onCreateGroup = groupData =>
(dispatch) => {
  dispatch(onCreateGroupRequest(groupData));
  let headers;
  apiHandler('/api/create-group', groupData, 'post', headers).then((groupRes) => {
    dispatch(onCreateGroupSuccess(groupRes.data));
  }).catch((groupRes) => {
    dispatch(onCreateGroupFailure(groupRes.data));
  });
};

export default onCreateGroup;
