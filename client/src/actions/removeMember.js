
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const onRemoveMemberRequest = () => ({
  type: actionType.REMOVE_MEMBER_REQUEST,
  RemoveMemberIsLoading: true
});

export const onRemoveMemberSuccess = member => ({
  type: actionType.REMOVE_MEMBER_SUCCESS,
  messageIsLoading: false,
  member
});

export const onRemoveMemberFailure = () => ({
  type: actionType.SEND_MESSAGE_FAILURE,
  messageIsLoading: false
});

const onRemoveMember = dataValue =>
(dispatch) => {
  const Materialize = window.Materialize;
  if (confirm(`Are you sure you want to delete: ${dataValue.username}`)) {
    dispatch(onRemoveMemberRequest());
    const groupname =
      location.href.split('/')[location.href.split('/').length - 1];
    let headers;
    apiHandler(`/api/groups/${groupname}/remove-member`,
      dataValue, 'post', headers)
    .then((RemoveMemberResponse) => {
      dispatch(onRemoveMemberSuccess(RemoveMemberResponse.data.username));
      Materialize.toast(RemoveMemberResponse.data.message, 2500, 'green');
    }).catch((errorResponse) => {
      dispatch(onRemoveMemberFailure());
      Materialize.toast(
        errorResponse.response.data.error.message, 2500, 'red'
      );
    });
  }
};

export default onRemoveMember;
