import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';
import authError from '../components/helpers/authError';

export const onSendMessageRequest = () => ({
  type: actionType.SEND_MESSAGE_REQUEST,
  messageIsLoading: true
});

export const onSendMessageSuccess = message => ({
  type: actionType.SEND_MESSAGE_SUCCESS,
  messageIsLoading: false,
  message
});

export const onSendMessageFailure = () => ({
  type: actionType.SEND_MESSAGE_FAILURE,
  messageIsLoading: false
});

const onSendMessage = message =>
  (dispatch) => {
    dispatch(onSendMessageRequest());
    const groupname =
      location.href.split('/')[location.href.split('/').length - 1];
    apiHandler(`/api/groups/${groupname}/send-message`, message, 'post')
      .then((messageResponse) => {
        dispatch(onSendMessageSuccess(messageResponse.data));
      }).catch((errorResponse) => {
        if (authError(errorResponse) !== 'notAuthError') {
          return;
        }
        dispatch(onSendMessageFailure());
        swal({
          text: errorResponse.response.data.error.message,
          icon: 'warning',
          buttons: false,
          timer: 1000,
        });
      });
  };

export default onSendMessage;
