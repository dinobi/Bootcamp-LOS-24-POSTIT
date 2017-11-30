import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';
import authError from '../components/helpers/authError';

export const loadGroupMembersRequest = () => ({
  type: actionType.LOAD_GROUP_MEMBERS_REQUEST
});

export const loadGroupMembersSuccess = groupMembers => ({
  type: actionType.LOAD_GROUP_MEMBERS_SUCCESS,
  groupMembers
});

export const loadGroupMembersFailure = () => ({
  type: actionType.LOAD_GROUP_MEMBERS_FAILURE
});

const loadGroupMembers = () =>
  (dispatch) => {
    dispatch(loadGroupMembersRequest());
    const groupname =
      location.href.split('/')[location.href.split('/').length - 1];
    apiHandler(`/api/groups/${groupname}/members`, '', 'get')
      .then((groupMembersRes) => {
        dispatch(loadGroupMembersSuccess(groupMembersRes.data));
      }).catch((groupMembersRes) => {
        if (authError(groupMembersRes) !== 'notAuthError') {
          return;
        }
        dispatch(groupMembersRes());
        swal({
          text: groupMembersRes.response.data.error.message,
          icon: 'warning',
          buttons: false,
          timer: 1600,
        });
      });
  };

export default loadGroupMembers;
