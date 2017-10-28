import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

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
  const Materialize = window.Materialize;
  dispatch(onSendMessageRequest());
  const groupname =
    location.href.split('/')[location.href.split('/').length - 1];
  let headers;
  apiHandler(`/api/groups/${groupname}/send-message`, message, 'post', headers)
  .then((messageResponse) => {
    dispatch(onSendMessageSuccess(messageResponse.data));
  }).catch((errorResponse) => {
    dispatch(onSendMessageFailure());
    Materialize.toast(errorResponse.response.data.error.message, 2500, 'red');
  });
};

export default onSendMessage;
