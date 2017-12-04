
import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';
import authError from '../components/helpers/authError';

export const onRemoveMemberRequest = () => ({
  type: actionType.REMOVE_MEMBER_REQUEST
});

export const onRemoveMemberSuccess = member => ({
  type: actionType.REMOVE_MEMBER_SUCCESS,
  member
});

export const onRemoveMemberFailure = () => ({
  type: actionType.SEND_MESSAGE_FAILURE
});

const onRemoveMember = dataValue =>
  (dispatch) => {
    if (dataValue.authUser === dataValue.username) {
      swal({
        text: 'You are the Admin!,are you sure you want to exit this group?',
        icon: 'warning',
        buttons: ['cancel', 'exit']
      })
        .then((remove) => {
          if (remove) {
            dispatch(onRemoveMemberRequest());
            const groupname =
              location.href.split('/')[location.href.split('/').length - 1];
            apiHandler(`/api/groups/${groupname}/remove-member`,
              dataValue, 'post')
              .then((RemoveMemberResponse) => {
                dispatch(onRemoveMemberSuccess(
                  RemoveMemberResponse.data.username
                ));
                history.back();
              }).catch((errorResponse) => {
                if (authError(errorResponse) !== 'notAuthError') {
                  return;
                }
                dispatch(onRemoveMemberFailure());
                swal({
                  text: errorResponse.response.data.error.message,
                  icon: 'error',
                  buttons: false,
                  timer: 1600
                });
              });
          }
        })
        .catch((error) => {
          swal({
            text: error.repsonse.data.message,
          });
        });
    } else {
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
              }).catch((errorResponse) => {
                if (authError(errorResponse) !== 'notAuthError') {
                  return;
                }
                dispatch(onRemoveMemberFailure());
                swal({
                  text: errorResponse.response.data.error.message,
                  icon: 'error'
                });
              });
          }
        })
        .catch((error) => {
          swal({
            text: error.repsonse.data.message,
          });
        });
    }
  };

export default onRemoveMember;
