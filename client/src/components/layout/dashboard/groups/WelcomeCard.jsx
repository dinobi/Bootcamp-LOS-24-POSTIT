import React from 'react';
import PropTypes from 'prop-types';

/**
 * WelcomeCard Component
 * Displays a message if group message
 * board is empty
 *
 * @method WelcomeCard
 * @returns {Object} JSX
 * @param {Object} props
 */
const WelcomeCard = ({ emptyBoard }) =>
  <div className="col s12">
    <h2 className="header">Horizontal Card</h2>
    <div className="card horizontal">
      <div className="card-image">
        <img src="" />
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <h5 className="black-text">{emptyBoard}</h5>
        </div>
      </div>
    </div>
  </div>;

WelcomeCard.defaultProps = {
  emptyBoard: 'Your message board is empty',
};
WelcomeCard.propTypes = {
  emptyBoard: PropTypes.string.isRequired
};

export default WelcomeCard;
