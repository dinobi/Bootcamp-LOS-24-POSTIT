import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

/**
 * Request to add user to group
 * @return {object} action
 */
export const onAddMemberRequest = () => ({
  type: actionType.ADD_MEMBER_REQUEST,
  addMemberIsLoading: true,
});

/**
 * Request to add user was success
 * @return {object} action
 * @param {object} member
 */
export const onAddMemberSuccess = member => ({
  type: actionType.ADD_MEMBER_SUCCESS,
  messageIsLoading: false,
  member
});

/**
 * Request to add user failed
 * @return {object} action
 */
export const onAddMemberFailure = () => ({
  type: actionType.ADD_MEMBER_FAILURE,
  messageIsLoading: false
});

/**
 * Allows a user add other users to group
 * @return {object} action
 * @param {object} user
 */
const onAddMember = user =>
(dispatch) => {
  dispatch(onAddMemberRequest());
  const groupname =
    location.href.split('/')[location.href.split('/').length - 1];
  let headers;
  apiHandler(`/api/groups/${groupname}/add-member`, user, 'post', headers)
  .then((addMemberResponse) => {
    dispatch(onAddMemberSuccess(addMemberResponse.data.member));
    swal({
      text: addMemberResponse.data.message,
      icon: 'success',
      buttons: false,
      timer: 1600
    });
  }).catch((errorResponse) => {
    dispatch(onAddMemberFailure());
    swal({
      text: errorResponse.response.data.error.message,
      buttons: false,
      timer: 1600
    });
  });
};

export default onAddMember;
