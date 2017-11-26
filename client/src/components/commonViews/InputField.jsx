import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

/**
 * InputField Component
 * Displays an input field element
 *
 * @method InputField
 * @returns {Object} JSX
 * @param {Object} props
 */
const InputField =
  ({ inputClass, onFocus, type, id, placeHolder, onChange, inputRef, label }) =>
    <div className={inputClass}>
      <input
        onFocus={onFocus}
        placeholder={placeHolder}
        id={id}
        type={type}
        className="validate"
        onChange={onChange}
        ref={inputRef}
      />
      <label className="active" htmlFor={id}>{label}</label>
    </div>;

InputField.defaultProps = {
  inputClass: '',
  type: '',
  id: '',
  onFocus: () => { },
  placeholder: '',
  onChange: () => { },
  inputRef: () => { },
  label: ''
};
InputField.propTypes = {
  inputClass: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  inputRef: PropTypes.func,
  label: PropTypes.string,
};

export default InputField;
