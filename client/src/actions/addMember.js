import swal from 'sweetalert';
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
  dispatch(onAddMemberRequest());
  const groupname =
    location.href.split('/')[location.href.split('/').length - 1];
  let headers;
  apiHandler(`/api/groups/${groupname}/add-member`, user, 'post', headers)
  .then((addMemberResponse) => {
    dispatch(onAddMemberSuccess(addMemberResponse.data.member));
    swal({
      text: addMemberResponse.data.message,
      icon: 'success'
    });
  }).catch((errorResponse) => {
    dispatch(onAddMemberFailure());
    swal({
      text: errorResponse.response.data.error.message,
      icon: 'error'
    });
  });
};

export default onAddMember;
