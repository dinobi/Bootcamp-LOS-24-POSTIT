import actionType from '../actionTypes';
import apiHandler from '../components/helpers/api-handler';

export const onSearchRequest = searchQuery => ({
  type: actionType.SEARCH_REQUEST,
  searchIsLoading: true,
  searchQuery
});

export const onSearchSuccess = searchResult => ({
  type: actionType.SEARCH_SUCCESS,
  searchIsLoading: false,
  searchResult
});

export const onSearchFailure = message => ({
  type: actionType.SEARCH_FAILURE,
  searchIsLoading: false,
  message
});

const onSearch = (searchTerm, page) =>
(dispatch) => {
  dispatch(onSearchRequest(searchTerm));
  const groupname =
    location.href.split('/')[location.href.split('/').length - 1];
  let headers;
  apiHandler(
    `/api/search/${groupname}/${searchTerm}/${page}`,
    '', 'get', headers
  ).then((searchRes) => {
    dispatch(onSearchSuccess(searchRes.data));
  }).catch((searchRes) => {
    dispatch(onSearchFailure(searchRes.response.data.error.message));
  });
};

export default onSearch;
