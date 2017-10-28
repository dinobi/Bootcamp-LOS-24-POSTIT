
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const onAddMemberRequest = () => ({
  type: actionType.ADD_MEMBER_REQUEST,
  addMemberIsLoading: true,
});

export const onAddMemberSuccess = member => ({
  type: actionType.ADD_MEMBER_SUCCESS,
  messageIsLoading: false,
  member
});

export const onAddMemberFailure = () => ({
  type: actionType.ADD_MEMBER_FAILURE,
  messageIsLoading: false
});

const onAddMember = user =>
(dispatch) => {
  const Materialize = window.Materialize;
  dispatch(onAddMemberRequest());
  const groupname =
    location.href.split('/')[location.href.split('/').length - 1];
  let headers;
  apiHandler(`/api/groups/${groupname}/add-member`, user, 'post', headers)
  .then((addMemberResponse) => {
    dispatch(onAddMemberSuccess(addMemberResponse.data.member));
    Materialize.toast(addMemberResponse.data.message, 2500, 'green');
  }).catch((errorResponse) => {
    dispatch(onAddMemberFailure());
    Materialize.toast(errorResponse.response.data.error.message, 2500, 'red');
  });
};

export default onAddMember;
