import React from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorAlert Component
 * Displays a message when a component has errored
 *
 * @method ErrorAlert
 * @returns {Object} JSX
 * @param {Object} props
 */
const ErrorAlert = ({ errorMessage }) =>
  <p className="alert error-alert">
    <i className="fa fa-exclamation-triangle"></i>
    &nbsp;{errorMessage}
  </p>;

ErrorAlert.defaultProps = {
  errorMessage: '',
};
ErrorAlert.propTypes = {
  errorMessage: PropTypes.string.isRequired
};

export default ErrorAlert;
