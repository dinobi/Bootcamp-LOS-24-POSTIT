import React from 'react';

class SearchForm extends React.Component {
  render() {
		console.log(this.props.searchQuery);
		return (
			<div id="search-field" className={ this.props.searchContext }>
				<input name="search" id={ this.props.searchContext } 
				type="search" placeholder="Start your search"
				value={ this.props.searchQuery }
				onChange={ this.props.handleChange }/>
				<button className="btn btn-create" onClick={ this.props.handleClick }>Start search</button>
			</div>
		);
  }
}

export default SearchForm;