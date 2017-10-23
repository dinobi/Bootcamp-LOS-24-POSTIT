
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const onRemoveMemberRequest = member => ({
  type: actionType.REMOVE_MEMBER_REQUEST,
  RemoveMemberIsLoading: true,
  member
});

export const onRemoveMemberSuccess = (member, message) => ({
  type: actionType.REMOVE_MEMBER_SUCCESS,
  messageIsLoading: false,
  member,
  message
});

export const onRemoveMemberFailure = message => ({
  type: actionType.SEND_MESSAGE_FAILURE,
  messageIsLoading: false,
  message
});

const onRemoveMember = dataValue =>
(dispatch) => {
  const Materialize = window.Materialize;
  dispatch(onRemoveMemberRequest(dataValue));
  const groupname =
    location.href.split('/')[location.href.split('/').length - 1];
  let headers;
  apiHandler(`/api/groups/${groupname}/remove-member`,
    dataValue, 'post', headers)
  .then((RemoveMemberRes) => {
    dispatch(onRemoveMemberSuccess(RemoveMemberRes.data));
    Materialize.toast(RemoveMemberRes.data.message, 2500, 'green');
  }).catch((RemoveMemberRes) => {
    dispatch(
      onRemoveMemberFailure(RemoveMemberRes.response.data.error.message)
    );
    Materialize.toast(
      RemoveMemberRes.response.data.error.message, 2500, 'red'
    );
  });
};

export default onRemoveMember;
