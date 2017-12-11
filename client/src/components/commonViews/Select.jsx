import React from 'react';
import PropTypes from 'prop-types';

/**
 * Select Component
 * Displays a select tool for varying data options
 *
 * @method Select
 * @returns {Object} JSX
 * @param {Object} props
 */
const Select = ({ children, id, selectRef, selectClass }) =>
  <select id={id} ref={selectRef} className={selectClass}>
    {children}
  </select>;

Select.defaultProps = {
  id: '',
  selectRef: () => { },
  selectClass: ''
};
Select.propTypes = {
  id: PropTypes.string.isRequired,
  selectRef: PropTypes.func.isRequired,
  selectClass: PropTypes.string.isRequired
};

export default Select;
