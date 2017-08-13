import React from 'react';

class SearchResult extends React.Component {
  render() {
    console.log('this.props.searchResult:', this.props.searchResult);
    return (
      <section className="search-result">
         {
            this.props.searchResult.map(
              (item, index) => <ResultItem item={item} key={index}/>
            )
        }
      </section>
    );
  }
}

class ResultItem extends React.Component {
  render() {
    return (
        /** Todo: 1. Create a checkbox to select muiltiple users
         * 2. Add a drop down to select which user created group to add selected members to
         * 3. Add view button to see details about a group in search result
         * */      
        <div>
            <li key={this.props.key}>{this.props.item}</li>
        </div>
    );
  }
}

export default SearchResult;