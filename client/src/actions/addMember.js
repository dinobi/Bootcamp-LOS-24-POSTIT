
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const onAddMemberRequest = user => ({
  type: actionType.ADD_MEMBER_REQUEST,
  addMemberIsLoading: true,
  user
});

export const onAddMemberSuccess = (member, message) => ({
  type: actionType.ADD_MEMBER_SUCCESS,
  messageIsLoading: false,
  member,
  message
});

export const onAddMemberFailure = message => ({
  type: actionType.SEND_MESSAGE_FAILURE,
  messageIsLoading: false,
  message
});

const onAddMember = user =>
(dispatch) => {
  const Materialize = window.Materialize;
  dispatch(onAddMemberRequest(user));
  const groupname =
    location.href.split('/')[location.href.split('/').length - 1];
  let headers;
  apiHandler(`/api/groups/${groupname}/add-member`, user, 'post', headers)
  .then((addMemberRes) => {
    dispatch(onAddMemberSuccess(addMemberRes.data));
    Materialize.toast(addMemberRes.data.message, 2500, 'green');
  }).catch((addMemberRes) => {
    dispatch(onAddMemberFailure(addMemberRes.response.data.error.message));
    Materialize.toast(addMemberRes.response.data.error.message, 2500, 'red');
  });
};

export default onAddMember;
