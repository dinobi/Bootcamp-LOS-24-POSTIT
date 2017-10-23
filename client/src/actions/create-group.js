import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const onCreateGroupRequest = groupData => ({
  type: actionType.CREATE_GROUP_REQUEST,
  createGroupIsLoading: true,
  groupData
});

export const onCreateGroupSuccess = message => ({
  type: actionType.CREATE_GROUP_SUCCESS,
  createGroupIsLoading: false,
  message
});

export const onCreateGroupFailure = message => ({
  type: actionType.CREATE_GROUP_FAILURE,
  createGroupIsLoading: false,
  message
});

const onCreateGroup = groupData =>
(dispatch) => {
  const Materialize = window.Materialize;
  dispatch(onCreateGroupRequest(groupData));
  let headers;
  apiHandler('/api/create-group', groupData, 'post', headers)
  .then((groupRes) => {
    dispatch(onCreateGroupSuccess(groupRes.data.message));
    Materialize.toast(groupRes.data.message, 2500, 'green');
  }).catch((groupRes) => {
    dispatch(onCreateGroupFailure(groupRes.response.data.error.message));
    Materialize.toast(groupRes.response.data.error.message, 2500, 'red');
  });
};

export default onCreateGroup;
