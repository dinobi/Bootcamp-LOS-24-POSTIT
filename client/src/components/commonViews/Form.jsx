import React from 'react';
import PropTypes from 'prop-types';

/**
 * Form Component
 * Displays a form that has other nested component
 *
 * @method Form
 *
 * @returns {Object} JSX
 *
 * @param {Object} props
 */
const Form = ({ children, id, onSubmit, formClass }) =>
  <form
    className={`form ${formClass}`}
    id={id}
    onSubmit={onSubmit}
  >
    {children}
  </form>;

Form.defaultProps = {
  formClass: '',
  onSubmit: () => { }
};
Form.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formClass: PropTypes.string.isRequired
};

export default Form;
