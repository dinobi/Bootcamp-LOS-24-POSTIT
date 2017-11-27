import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const CLOSE_MODAL = 'CLOSE_MODAL';

export const onCloseModal = () => ({
  type: CLOSE_MODAL,
  modalOpened: false
});

/**
 * Request to create a new group
 * @return {object} action
 */
export const onCreateGroupRequest = () => ({
  type: actionType.CREATE_GROUP_REQUEST,
  createGroupIsLoading: true
});

/**
 * Request to create group success
 * @return {object} action
 * @param {object} group
 */
export const onCreateGroupSuccess = group => ({
  type: actionType.CREATE_GROUP_SUCCESS,
  createGroupIsLoading: false,
  group
});

/**
 * Request to create group failure
 * @return {object} action
 */
export const onCreateGroupFailure = () => ({
  type: actionType.CREATE_GROUP_FAILURE,
  createGroupIsLoading: false
});

/**
 * Allows a user create a new group
 * @return {object} action
 * @param {object} groupData
 */
const onCreateGroup = groupData =>
  (dispatch) => {
    dispatch(onCreateGroupRequest(groupData));
    let headers;
    apiHandler('/api/create-group', groupData, 'post', headers)
      .then((groupRes) => {
        dispatch(onCreateGroupSuccess(groupRes.data.groupData));
        swal({
          text: groupRes.data.message,
          icon: 'success',
          buttons: false,
          timer: 1600
        });
        dispatch(onCloseModal());
      }).catch((groupRes) => {
        dispatch(onCreateGroupFailure(groupRes.response.data.error.message));
        swal({
          text: groupRes.response.data.error.message,
          icon: 'error',
          buttons: false,
          timer: 1600
        });
      });
  };

export default onCreateGroup;
