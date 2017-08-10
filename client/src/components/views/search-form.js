import React from 'react';

class SearchForm extends React.Component {
  render() {
	return (
	  <div id="search-field" className={ this.props.searchContext }>
	    <input name="search" id={ this.props.searchContext } type="search" placeholder="Start your search"/>
	    <button className="btn btn-create">Start search</button>
	  </div>
	);
  }
}

export default SearchForm;