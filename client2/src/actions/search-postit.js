import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const onSearchRequest = searchTerm => ({
  type: actionType.SEARCH_REQUEST,
  searchIsLoading: true
});

export const onSearchSuccess = searchRes => ({
  type: actionType.SEARCH_SUCCESS,
  searchIsLoading: false,
  searchRes
});

export const onSearchFailure = message => ({
  type: actionType.SEARCH_FAILURE,
  searchIsLoading: false,
  message
});

const onSearchPostit = () =>
(dispatch) => {
  dispatch(onSearchRequest());
  const headers = new Headers();
  headers['x-access-token'] = localStorage.getItem('userAuth');
  apiHandler('/api/groups', headers).then((searchRes) => {
    console.log(searchRes.data);
    dispatch(onSearchSuccess(searchRes.data));
  }).catch((searchRes) => {
    dispatch(onSearchFailure(searchRes.data.error.message));
  });
};

export default onSearchPostit;
