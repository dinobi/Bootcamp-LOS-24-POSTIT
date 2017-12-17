import React from 'react';
import PropTypes from 'prop-types';

/**
 * GroupCard Component
 * Displays created group card for existing groups
 *
 * @method GroupCard
 *
 * @returns {Object} JSX
 *
 * @param {Object} props
 */
const GroupCard = ({ location, description, archive }) =>
    <div className="col s12 m4">
      <div className="card">
        <div className="card-content">
          <span
            className="card-title activator grey-text text-darken-4 truncate">
            {location}
          </span>
          <p className="group-description truncate grey-text">
           {description}
          </p>
          {archive}
        </div>
      </div>
    </div>;

GroupCard.defaultProps = {
  location: {},
  description: 'No description',
  archive: {}
};

GroupCard.propTypes = {
  location: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  archive: PropTypes.object.isRequired
};

export default GroupCard;
