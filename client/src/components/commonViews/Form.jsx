import React from 'react';// eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

/**
 * Form Component
 * Displays a form that has other nested component
 *
 * @method Form
 * @returns {Object} JSX
 * @param {Object} props
 */
const Form = ({ children, id, onSubmit, formClass }) =>
  <div>
    <section>
      <form
        className={`form ${formClass}`}
        id={id}
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </section>
  </div>;

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
