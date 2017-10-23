import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const onLoadGroupsRequest = () => ({
  type: actionType.LOAD_GROUPS_REQUEST,
  groupsIsLoading: true
});

export const onLoadGroupsSuccess = groups => ({
  type: actionType.LOAD_GROUPS_SUCCESS,
  groupsIsLoading: false,
  groups
});

export const onLoadGroupsFailure = message => ({
  type: actionType.LOAD_GROUPS_FAILURE,
  groupsIsLoading: false,
  message
});

const onLoadGroups = () =>
(dispatch) => {
  dispatch(onLoadGroupsRequest());
  const Materialize = window.Materialize;
  let headers;
  apiHandler('/api/groups/me', '', 'get', headers).then((loadGroupsRes) => {
    dispatch(onLoadGroupsSuccess(loadGroupsRes.data));
    Materialize.toast(loadGroupsRes.data.message, 2500, 'green');
  }).catch((loadGroupsRes) => {
    dispatch(onLoadGroupsFailure(loadGroupsRes.data.error.message));
    Materialize.toast(loadGroupsRes.data.error.message, 2500, 'red');
  });
};

export default onLoadGroups;
