import swal from 'sweetalert';
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
  dispatch(onCreateGroupRequest(groupData));
  let headers;
  apiHandler('/api/create-group', groupData, 'post', headers)
  .then((groupRes) => {
    dispatch(onCreateGroupSuccess(groupRes.data.message));
    swal({
      text: groupRes.data.message,
      icon: 'success'
    });
  }).catch((groupRes) => {
    dispatch(onCreateGroupFailure(groupRes.response.data.error.message));
    swal({
      text: groupRes.response.data.error.message,
      icon: 'error'
    });
  });
};

export default onCreateGroup;
