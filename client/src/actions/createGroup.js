import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const onCreateGroupRequest = () => ({
  type: actionType.CREATE_GROUP_REQUEST,
  createGroupIsLoading: true
});

export const onCreateGroupSuccess = group => ({
  type: actionType.CREATE_GROUP_SUCCESS,
  createGroupIsLoading: false,
  group
});

export const onCreateGroupFailure = () => ({
  type: actionType.CREATE_GROUP_FAILURE,
  createGroupIsLoading: false
});

const onCreateGroup = groupData =>
(dispatch) => {
  dispatch(onCreateGroupRequest(groupData));
  let headers;
  apiHandler('/api/create-group', groupData, 'post', headers)
  .then((groupRes) => {
    dispatch(onCreateGroupSuccess(groupRes.data.groupData));
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
