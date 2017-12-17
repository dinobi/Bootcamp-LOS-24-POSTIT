import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Button } from '../../../commonViews';

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
        <div key={foundUser.id}>
          <ListItem key={foundUser.id}
          name={foundUser.username}
          iconClass="fa fa-user"
          listClass="result-item"
          />
          <Button
            onClick={() => handleAddMember(foundUser)}
            btnClass="btn btn-create right"
            name="Add"
          />
        </div>
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
