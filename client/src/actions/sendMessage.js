import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';
import authError from '../components/helpers/authError';

/**
 * Request to send message
 *
 * @return {object} action
 */
export const onSendMessageRequest = () => ({
  type: actionType.SEND_MESSAGE_REQUEST
});

/**
 * Request to send message was successful
 *
 * @return {object} action
 *
 * @param {object} message
 */
export const onSendMessageSuccess = message => ({
  type: actionType.SEND_MESSAGE_SUCCESS,
  message
});

/**
 * Request to send message failure
 *
 * @return {object} action
 */
export const onSendMessageFailure = () => ({
  type: actionType.SEND_MESSAGE_FAILURE
});

/**
 * Allows a user send broadcast message to group
 *
 * @return {object} action
 *
 * @param {object} message
 * @param {object} groupname
 */
const onSendMessage = (message, groupname) =>
  (dispatch) => {
    dispatch(onSendMessageRequest());
    return apiHandler(`/api/groups/${groupname}/send-message`, message, 'post')
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
