import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card Component
 * @method Card
 * @returns {Object} JSX
 * @param {Object} props
 */
const Card = ({ children, cardControl }) =>
  <div className={cardControl}>
    <div className="card-content">
      {children}
    </div>
  </div>;

Card.defaultProps = {
  cardControl: ''
};
Card.propTypes = {
  cardControl: PropTypes.string
};

export default Card;
