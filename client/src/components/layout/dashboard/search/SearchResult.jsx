import React from 'react';
/**
 *
 * @class SearchResult
 * @extends {React.Component}
 */
class SearchResult extends React.Component {
  render() {
    const { searchResult, message } = this.props.searchResult;
    return (
      <section className="search-result">
        {
          searchResult.length > 0 ?
            searchResult.map(
              (item, index) => <ResultItem item={item} key={index} />
            ) :
            <h5>{message}</h5>
        }
      </section>
    );
  }
}

export const ResultItem = (props) => {
  const { username } = props.item;
  return (
      /** Todo: 1. Create a checkbox to select muiltiple users
       * 2. Add a drop down to select which user created group to add selected members to
       * 3. Add view button to see details about a group in search result
       * */
      <div>
          <li>{username}</li>
      </div>
  );
};

export default SearchResult;
