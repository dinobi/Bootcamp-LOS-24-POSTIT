import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';
import authError from '../components/helpers/authError';

/**
 * Request to create a new group
 *
 * @return {object} action
 */
export const onCreateGroupRequest = () => ({
  type: actionType.CREATE_GROUP_REQUEST
});

/**
 * Request to create group success
 *
 * @return {object} action
 *
 * @param {object} group
 */
export const onCreateGroupSuccess = group => ({
  type: actionType.CREATE_GROUP_SUCCESS,
  group
});

/**
 * Request to create group failure
 *
 * @return {object} action
 */
export const onCreateGroupFailure = () => ({
  type: actionType.CREATE_GROUP_FAILURE
});

/**
 * Allows a user create a new group
 *
 * @return {object} action
 *
 * @param {object} groupData
 */
const onCreateGroup = groupData =>
  (dispatch) => {
    dispatch(onCreateGroupRequest(groupData));
    return apiHandler('/api/create-group', groupData, 'post')
      .then((groupRes) => {
        dispatch(onCreateGroupSuccess(groupRes.data.groupData));
        swal({
          text: groupRes.data.message,
          icon: 'success',
          buttons: false,
          timer: 1600
        });
      }).catch((groupRes) => {
        if (authError(groupRes) !== 'notAuthError') {
          return;
        }
        dispatch(onCreateGroupFailure(groupRes.response.data.error.message));
        swal({
          text: groupRes.response.data.error.message,
          icon: 'error',
          timer: 2000
        });
      });
  };

export default onCreateGroup;
