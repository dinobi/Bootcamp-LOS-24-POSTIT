import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';
import authError from '../components/helpers/authError';

/**
 * Request to load groups from the server
 *
 * @return {object} action
 */
export const onLoadGroupsRequest = () => ({
  type: actionType.LOAD_GROUPS_REQUEST
});

/**
 * Request to load groups from the server success
 *
 * @return {object} action
 *
 * @param {object} groups
 */
export const onLoadGroupsSuccess = groups => ({
  type: actionType.LOAD_GROUPS_SUCCESS,
  groups
});

/**
 * Request to load groups from the server failure
 *
 * @return {object} action
 */
export const onLoadGroupsFailure = () => ({
  type: actionType.LOAD_GROUPS_FAILURE
});

/**
 * Allows a user fetch groups from the server
 *
 * @return {object} action
 */
const onLoadGroups = () =>
  (dispatch) => {
    dispatch(onLoadGroupsRequest());
    return apiHandler('/api/groups/me', '', 'get')
      .then((loadGroupsRes) => {
        dispatch(onLoadGroupsSuccess(loadGroupsRes.data));
      }).catch((loadGroupsRes) => {
        if (authError(loadGroupsRes) !== 'notAuthError') {
          return;
        }
        dispatch(onLoadGroupsFailure());
        swal({
          text: loadGroupsRes.response.data.error.message,
          icon: 'warning',
          buttons: false,
          timer: 1600,
        });
      });
  };

export default onLoadGroups;
