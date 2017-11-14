import React from 'react';

const ErrorAlert = ({ errorMessage }) =>
  <p className="alert error-alert">
    <i className="fa fa-exclamation-triangle"></i>
    &nbsp;{errorMessage}
  </p>;

export default ErrorAlert;
