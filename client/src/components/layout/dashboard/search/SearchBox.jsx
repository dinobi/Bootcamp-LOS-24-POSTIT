import React from 'react';
import PropTypes from 'prop-types';
import {
	Button, InputField,
} from '../../../commonViews';

/**
 * SearchBox Component
 * Displays a search input field and submit button
 *
 * @method SearchBox
 *
 * @returns {Object} JSX
 *
 * @param {Object} props
 */
const SearchBox =
	({ searchContext, onFocus, searchTerm, handleChange, handleSearch }) =>
		<div id="search-field" className={searchContext}>
			<InputField
				name="search"
				id={searchContext}
				onFocus={onFocus}
				type="search"
				placeholder="Start your search"
				value={searchTerm}
				onChange={handleChange}
			/>
			<div className="center">
				<Button
					btnClass="btn btn-create"
					onClick={handleSearch}
					name="Start search"
				/>
			</div>
		</div>;

SearchBox.defaultProps = {
  id: 'username',
  onFocus: () => { },
  value: '',
  onChange: () => { }
};
SearchBox.propTypes = {
  id: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchBox;
