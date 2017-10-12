import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const onSendMessageRequest = message => ({
  type: actionType.SEND_MESSAGE_REQUEST,
  messageIsLoading: true,
  message
});

export const onSendMessageSuccess = () => ({
  type: actionType.SEND_MESSAGE_SUCCESS,
  messageIsLoading: false,
});

export const onSendMessageFailure = message => ({
  type: actionType.SEND_MESSAGE_FAILURE,
  messageIsLoading: false,
  message
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
    dispatch(onSendMessageSuccess(messageRes.data));
  });
};

export default onSendMessage;
