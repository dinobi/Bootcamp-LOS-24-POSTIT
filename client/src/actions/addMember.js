import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';
import authError from '../components/helpers/authError';

/**
 * Request to add user to group
 * @return {object} action
 */
export const onAddMemberRequest = () => ({
  type: actionType.ADD_MEMBER_REQUEST
});

/**
 * Request to add user was success
 * @return {object} action
 * @param {object} member
 */
export const onAddMemberSuccess = member => ({
  type: actionType.ADD_MEMBER_SUCCESS,
  member
});

/**
 * Request to add user failed
 * @return {object} action
 */
export const onAddMemberFailure = () => ({
  type: actionType.ADD_MEMBER_FAILURE
});

/**
 * Allows a user add other users to group
 * @return {object} action
 * @param {object} user
 */
const onAddMember = (user, groupname) =>
  (dispatch) => {
    dispatch(onAddMemberRequest());
    return apiHandler(`/api/groups/${groupname}/add-member`, user, 'post')
      .then((addMemberResponse) => {
        dispatch(onAddMemberSuccess(addMemberResponse.data.member));
        swal({
          text: addMemberResponse.data.message,
          icon: 'success',
          buttons: false,
          timer: 1600
        });
      }).catch((errorResponse) => {
        if (authError(errorResponse) !== 'notAuthError') {
          return;
        }
        dispatch(onAddMemberFailure());
        swal({
          text: errorResponse.response.data.error.message,
          buttons: false,
          timer: 1600
        });
      });
  };

export default onAddMember;
