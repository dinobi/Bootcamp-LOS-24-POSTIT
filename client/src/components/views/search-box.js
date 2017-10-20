import React from 'react';

const SearchBox = (props) => {
	console.log(props.searchQuery);
	return (
		<div id="search-field" className={ props.searchContext }>
			<input name="search" id={ props.searchContext }
			type="search" placeholder="Start your search"
			value={ props.searchQuery }
			onChange={ props.handleChange }/>
			<button className="btn btn-create" onClick={ props.handleSearch }>Start search</button>
		</div>
	);
};


export default SearchBox;
