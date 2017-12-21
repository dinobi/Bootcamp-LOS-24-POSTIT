import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '../../../commonViews';

/**
 * SearchResult Component
 * Displays a all search result
 *
 * @method SearchResult
 *
 * @returns {Object} JSX
 *
 * @param {Object} props
 */
const SearchResult = ({ foundUsers, handleAddMember }) =>
  <section className="search-result">
    {
      foundUsers.map(foundUser =>
        <span className="chip result-item" key={foundUser.id}>
          {foundUser.username}
          <IconButton
            iconClass="fa fa-plus"
            onClick={() => handleAddMember(foundUser)}
          />
        </span>
      )
    }
  </section>;

SearchResult.defaultProps = {
  foundUser: [],
};
SearchResult.propTypes = {
  foundUser: PropTypes.array.isRequired
};

export default SearchResult;
