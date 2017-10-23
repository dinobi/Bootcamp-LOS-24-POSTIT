import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const loadGroupMessagesRequest = () => ({
  type: actionType.LOAD_GROUP_MESSAGES_REQUEST,
  groupMessagesIsLoading: true
});

export const loadGroupMessagesSuccess = groupMessages => ({
  type: actionType.LOAD_GROUP_MESSAGES_SUCCESS,
  groupMessagesIsLoading: false,
  groupMessages
});

export const loadGroupMessagesFailure = message => ({
  type: actionType.LOAD_GROUP_MESSAGES_FAILURE,
  groupMessagesIsLoading: false,
  message
});

const loadGroupMessages = () =>
(dispatch) => {
  dispatch(loadGroupMessagesRequest());
  const Materialize = window.Materialize;
  const groupname =
    location.href.split('/')[location.href.split('/').length - 1];
  let headers;
  apiHandler(`/api/groups/${groupname}/show-messages`, '', 'get', headers)
  .then((groupMessagesRes) => {
    dispatch(loadGroupMessagesSuccess(groupMessagesRes.data));
    Materialize.toast(groupMessagesRes.data.message, 2500, 'green');
  }).catch((groupMessagesRes) => {
    dispatch(loadGroupMessagesFailure(groupMessagesRes));
    Materialize.toast(groupMessagesRes.response.data.error.message, 2500, 'red');
  });
};

export default loadGroupMessages;
