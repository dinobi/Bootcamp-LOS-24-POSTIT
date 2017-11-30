import swal from 'sweetalert';
import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';
import authError from '../components/helpers/authError';

export const onLoadGroupsRequest = () => ({
  type: actionType.LOAD_GROUPS_REQUEST
});

export const onLoadGroupsSuccess = groups => ({
  type: actionType.LOAD_GROUPS_SUCCESS,
  groups
});

export const onLoadGroupsFailure = () => ({
  type: actionType.LOAD_GROUPS_FAILURE
});

const onLoadGroups = () =>
  (dispatch) => {
    dispatch(onLoadGroupsRequest());
    apiHandler('/api/groups/me', '', 'get').then((loadGroupsRes) => {
      dispatch(onLoadGroupsSuccess(loadGroupsRes.data));
    }).catch((loadGroupsRes) => {
      if (authError(loadGroupsRes) !== 'notAuthError') {
        return;
      }
      dispatch(onLoadGroupsFailure());
      swal({
        text: loadGroupsRes.response.data.error.message,
        icon: 'warning',
        buttons: false,
        timer: 1600,
      });
    });
  };

export default onLoadGroups;
