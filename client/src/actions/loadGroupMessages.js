import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';
import authError from '../components/helpers/authError';

/**
 * Request to load group messages from the server
 *
 * @return {object} action
 */
export const loadGroupMessagesRequest = () => ({
  type: actionType.LOAD_GROUP_MESSAGES_REQUEST
});

/**
 * Request to load group messages from the server success
 *
 * @param {object} groupMessages
 *
 * @return {object} action
 */
export const loadGroupMessagesSuccess = groupMessages => ({
  type: actionType.LOAD_GROUP_MESSAGES_SUCCESS,
  groupMessages
});

/**
 * Request to load group messages from the server failure
 *
 * @return {object} action
 */
export const loadGroupMessagesFailure = () => ({
  type: actionType.LOAD_GROUP_MESSAGES_FAILURE
});

/**
 * Allows a user fetch group messages from the server
 *
 * @return {object} action
 *
 * @param {object} groupname
 */
const loadGroupMessages = groupname =>
(dispatch) => {
  dispatch(loadGroupMessagesRequest());
  return apiHandler(`/api/groups/${groupname}/show-messages`, '', 'get')
  .then((groupMessagesRes) => {
    dispatch(loadGroupMessagesSuccess(groupMessagesRes.data));
  }).catch((groupMessagesRes) => {
    if (authError(groupMessagesRes) !== 'notAuthError') {
      return;
    }
    dispatch(loadGroupMessagesFailure());
    swal({
      text: groupMessagesRes.response.data.error.message,
      icon: 'warning',
      buttons: false,
      timer: 1000,
    });
  });
};

export default loadGroupMessages;
