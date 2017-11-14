import React from 'react';
import {
  Button, InputField,
} from '../../../commonViews';

const SearchBox = props =>
	<div id="search-field" className = { props.searchContext }>
		<input name="search"
			id={ props.searchContext }
			onFocus = { props.onFocus }
			type="search" placeholder="Start your search"
			value={ props.searchTerm }
			onChange={ props.handleChange }
		/>
		<div className="center">
			<button className="btn btn-create" onClick={ props.handleSearch }>Start search</button>
		</div>
	</div>


export default SearchBox;
