import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';
import authError from '../components/helpers/authError';

/**
 * Request to archive a group
 * @return {object} action
 */
export const onDeleteGroupRequest = () => ({
  type: actionType.DELETE_GROUP_REQUEST
});

/**
 * Request to archive group was successful
 * @param {object} group
 * @return {object} action
 */
export const onDeleteGroupSuccess = group => ({
  type: actionType.DELETE_GROUP_SUCCESS,
  group
});

/**
 * Request to archive a group failed
 * @return {object} action
 */
export const onDeleteGroupFailure = () => ({
  type: actionType.DELETE_GROUP_FAILURE
});

/**
 * Allows a user archive a group
 * @param {object} groupData
 * @return {object} action
 */
const onArchiveGroup = groupData =>
  (dispatch) => {
    dispatch(onDeleteGroupRequest());
    return apiHandler('/api/groups/delete-group',
      groupData, 'post')
      .then((groupResponse) => {
        dispatch(onDeleteGroupSuccess(groupResponse.data.group));
        swal(groupResponse.data.message, {
          buttons: false,
          timer: 1000,
        });
      }).catch((errorResponse) => {
        if (authError(errorResponse) !== 'notAuthError') {
          return;
        }
        dispatch(
          onDeleteGroupFailure()
        );
        swal({
          text: errorResponse.response.data.error.message,
          icon: 'error',
          buttons: false,
          timer: 1000,
        });
      });
  };

export default onArchiveGroup;
