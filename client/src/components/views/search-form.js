import React from 'react';

class SearchForm extends React.Component {
  render() {
	return (
	  <div id="search-field">
	    <input name="search-postit" 
	      id={ this.props.SearchContext } type="search" placeholder="Start your search"/>
	    <button className="btn btn-create">Start search</button>
	  </div>
	);
  }
}

export default SearchForm;