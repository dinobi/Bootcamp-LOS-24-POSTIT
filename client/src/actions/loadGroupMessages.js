import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';
import authError from '../components/helpers/authError';

export const loadGroupMessagesRequest = () => ({
  type: actionType.LOAD_GROUP_MESSAGES_REQUEST
});

export const loadGroupMessagesSuccess = groupMessages => ({
  type: actionType.LOAD_GROUP_MESSAGES_SUCCESS,
  groupMessages
});

export const loadGroupMessagesFailure = message => ({
  type: actionType.LOAD_GROUP_MESSAGES_FAILURE,
  message
});

const loadGroupMessages = () =>
(dispatch) => {
  dispatch(loadGroupMessagesRequest());
  const groupname =
    location.href.split('/')[location.href.split('/').length - 1];
  apiHandler(`/api/groups/${groupname}/show-messages`, '', 'get')
  .then((groupMessagesRes) => {
    dispatch(loadGroupMessagesSuccess(groupMessagesRes.data));
  }).catch((groupMessagesRes) => {
    if (authError(groupMessagesRes) !== 'notAuthError') {
      return;
    }
    swal({
      text: groupMessagesRes.response.data.error.message,
      icon: 'warning',
      buttons: false,
      timer: 1000,
    });
  });
};

export default loadGroupMessages;
