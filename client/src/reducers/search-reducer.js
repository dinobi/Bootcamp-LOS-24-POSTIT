import actionType from '../actionTypes';

/**
 *
 * @param {*} state
 * @param {*} action
 * @return {*} object
 */
const searchReducer = (state = {
  searchIsLoading: false,
  searchResult: [],
  message: ''
}, action) => {
  switch (action.type) {
    case actionType.SEARCH_REQUEST:
      return Object.assign({}, state, {
        searchIsLoading: true
      });
    case actionType.SEARCH_SUCCESS:
      return Object.assign({}, state, {
        saerchIsLoading: false,
        searchResult: action.searchResult
      });
    case actionType.SEARCH_FAILURE:
      return Object.assign({}, state, {
        searchIsLoading: false,
        message: action.message
      });
    default:
      return state;
  }
};

export default searchReducer;
