import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

/**
 * Request to archive a group
 * @return {object} action
 */
export const onDeleteGroupRequest = () => ({
  type: actionType.DELETE_GROUP_REQUEST,
  deleteGroupIsLoading: true
});

/**
 * Request to archive group was successful
 * @param {object} group
 * @return {object} action
 */
export const onDeleteGroupSuccess = group => ({
  type: actionType.DELETE_GROUP_SUCCESS,
  deleteGroupIsLoading: false,
  group
});

/**
 * Request to archive a group failed
 * @return {object} action
 */
export const onDeleteGroupFailure = () => ({
  type: actionType.DELETE_GROUP_FAILURE,
  deleteGroupIsLoading: false
});

/**
 * Allows a user archive a group
 * @param {object} groupData
 * @return {object} action
 */
const onArchiveGroup = groupData =>
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
        dispatch(
          onDeleteGroupFailure(errorResponse.response.data.error.message)
        );
        swal({
          text: errorResponse.response.data.error.message,
          icon: 'error',
          buttons: false,
          timer: 1000,
        });
      });
    }
  });
};

export default onArchiveGroup;
