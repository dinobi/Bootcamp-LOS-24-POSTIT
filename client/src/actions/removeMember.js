
import swal from 'sweetalert';
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
  swal({
    text: `Are you sure you want to remove ${dataValue.username}?`,
    icon: 'warning',
    buttons: ['cancel', 'remove']
  })
  .then((remove) => {
    if (remove) {
      dispatch(onRemoveMemberRequest());
      const groupname =
        location.href.split('/')[location.href.split('/').length - 1];
      let headers;
      apiHandler(`/api/groups/${groupname}/remove-member`,
        dataValue, 'post', headers)
      .then((RemoveMemberResponse) => {
        dispatch(onRemoveMemberSuccess(RemoveMemberResponse.data.username));
        swal({
          text: RemoveMemberResponse.data.message,
          icon: 'success'
        });
      }).catch((errorResponse) => {
        dispatch(onRemoveMemberFailure());
        swal({
          text: errorResponse.response.data.error.message,
          icon: 'error'
        });
      });
    }
  });
};

export default onRemoveMember;
