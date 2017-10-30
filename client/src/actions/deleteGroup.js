import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const onDeleteGroupRequest = () => ({
  type: actionType.DELETE_GROUP_REQUEST,
  deleteGroupIsLoading: true
});

export const onDeleteGroupSuccess = group => ({
  type: actionType.DELETE_GROUP_SUCCESS,
  deleteGroupIsLoading: false,
  group
});

export const onDeleteGroupFailure = () => ({
  type: actionType.DELETE_GROUP_FAILURE,
  deleteGroupIsLoading: false
});

const onDeleteGroup = groupData =>
(dispatch) => {
  dispatch(onDeleteGroupRequest(groupData));
  let headers;
  apiHandler('/api/groups/delete-group', groupData, 'post', headers)
  .then((groupResponse) => {
    dispatch(onDeleteGroupSuccess(groupResponse.data.group));
    swal({
      text: groupResponse.data.message,
      icon: 'success'
    });
  }).catch((errorResponse) => {
    dispatch(onDeleteGroupFailure(errorResponse.response.data.error.message));
    swal({
      text: errorResponse.response.data.error.message,
      icon: 'error'
    });
  });
};

export default onDeleteGroup;
