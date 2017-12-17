import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';
import authError from '../components/helpers/authError';

/**
 * Request to load group members from the server
 *
 * @return {object} action
 */
export const loadGroupMembersRequest = () => ({
  type: actionType.LOAD_GROUP_MEMBERS_REQUEST
});

/**
 * Request to load group members from the server success
 *
 * @return {object} action
 *
 * @param {object} groupMembers
 */
export const loadGroupMembersSuccess = groupMembers => ({
  type: actionType.LOAD_GROUP_MEMBERS_SUCCESS,
  groupMembers
});

/**
 * Request to load group members from the server failure
 *
 * @return {object} action
 */
export const loadGroupMembersFailure = () => ({
  type: actionType.LOAD_GROUP_MEMBERS_FAILURE
});

/**
 * Allows a user fetch group members from the server
 *
 * @return {object} action
 *
 * @param {object} groupname
 */
const loadGroupMembers = groupname =>
  (dispatch) => {
    dispatch(loadGroupMembersRequest());
    return apiHandler(`/api/groups/${groupname}/members`, '', 'get')
      .then((groupMembersRes) => {
        dispatch(loadGroupMembersSuccess(groupMembersRes.data));
      }).catch((groupMembersRes) => {
        if (authError(groupMembersRes) !== 'notAuthError') {
          return;
        }
        dispatch(loadGroupMembersFailure());
        swal({
          text: groupMembersRes.response.data.error.message,
          icon: 'warning',
          buttons: false,
          timer: 1600,
        });
      });
  };

export default loadGroupMembers;
