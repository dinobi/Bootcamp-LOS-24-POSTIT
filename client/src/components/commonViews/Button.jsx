import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button Component
 *
 * @method Button
 * @returns {Object} JSX
 * @param {Object} props
 */
const Button = ({ id, type, name, btnClass, disabled, onClick }) =>
  <button
    disabled={disabled}
    id={id}
    type={type}
    className={btnClass}
    onClick={onClick}
  >
    {name}
  </button>;

Button.defaultProps = {
  id: '',
  type: '',
  name: '',
  btnClass: '',
  disabled: false,
  onClick: () => {}
};

Button.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  btnClass: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
