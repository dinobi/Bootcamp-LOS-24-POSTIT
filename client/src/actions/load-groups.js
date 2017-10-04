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
  let headers;
  apiHandler('/api/groups/me', '', 'get', headers).then((loadGroupsRes) => {
    dispatch(onLoadGroupsSuccess(loadGroupsRes.data));
  }).catch((loadGroupsRes) => {
    dispatch(onLoadGroupsFailure(loadGroupsRes.data.error.message));
  });
};

export default onLoadGroups;
