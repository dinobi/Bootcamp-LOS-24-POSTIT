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
  let headers;
  apiHandler('/api/groups/:groupname/show-messages', '', 'get', headers)
  .then((groupMessagesRes) => {
    console.log('Success response', groupMessagesRes.data);
    dispatch(loadGroupMessagesSuccess(groupMessagesRes.data));
  }).catch((groupMessagesRes) => {
    console.log('failure res', groupMessagesRes);
    //dispatch(loadGroupMessagesFailure(groupMessagesRes.data.error.message));
  });
};

export default loadGroupMessages;
