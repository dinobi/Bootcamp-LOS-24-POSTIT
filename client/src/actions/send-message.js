import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const onSendMessageRequest = messageData => ({
  type: actionType.SEND_MESSAGE_REQUEST,
  messageIsLoading: true,
});

export const onSendMessageSuccess = message => ({
  type: actionType.SEND_MESSAGE_SUCCESS,
  messageIsLoading: false,
  message
});

export const onSendMessageFailure = messageError => ({
  type: actionType.SEND_MESSAGE_FAILURE,
  messageIsLoading: false,
  messageError
});

const onSendMessage = message =>
(dispatch) => {
  dispatch(onSendMessageRequest(message));
  const groupname = location.href.split('/')[location.href.split('/').length - 1];
  let headers;
  apiHandler(`/api/groups/${groupname}/send-message`, message, 'post', headers)
  .then((messageRes) => {
    dispatch(onSendMessageSuccess(messageRes.data));
  }).catch((messageRes) => {
    dispatch(onSendMessageFailure(messageRes.response.data.error.message));
  });
};

export default onSendMessage;
