import React from 'react';
import PropTypes from 'prop-types';

/**
 * IconButton Component
 * Displays actionable icons where required
 *
 * @method IconButton
 * @returns {Object} JSX
 * @param {Object} props
 */
const IconButton =
  ({ name, iconClass, dataPosition, dataDelay, dataTooltip, onClick }) =>
    (<i className={iconClass}
      data-position={dataPosition}
      data-delay={dataDelay}
      data-tooltip={dataTooltip}
      onClick={onClick}
      >
      {name}
    </i>);

IconButton.defaultProps = {
  name: '',
  iconClass: '',
  onClick: () => { },
};
IconButton.propTypes = {
  iconClass: PropTypes.string.isRequired,
  dataPosition: PropTypes.string,
  dataTooltip: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default IconButton;
