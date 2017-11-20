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
  swal({
    text: `Are you sure you want to archive ${groupData.groupname}?`,
    icon: 'warning',
    buttons: ['cancel', 'archive']
  })
  .then((remove) => {
    if (remove) {
      dispatch(onDeleteGroupRequest(groupData));
      let headers;
      apiHandler('/api/groups/delete-group', groupData, 'post', headers)
      .then((groupResponse) => {
        dispatch(onDeleteGroupSuccess(groupResponse.data.group));
        swal(groupResponse.data.message, {
          buttons: false,
          timer: 1000,
        });
      }).catch((errorResponse) => {
        dispatch(onDeleteGroupFailure(errorResponse.response.data.error.message));
        swal({
          text: errorResponse.response.data.error.message,
          icon: 'error'
        });
      });
    }
  });
};

export default onDeleteGroup;
