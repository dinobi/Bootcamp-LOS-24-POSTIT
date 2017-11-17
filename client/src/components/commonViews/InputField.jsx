import React from 'react';

const InputField = ({ inputClass, onFocus, type, id, placeHolder, onChange, inputRef, label }) =>
  <div className={inputClass}>
    <input
      onFocus = { onFocus }
      placeholder={placeHolder}
      id={id}
      type={type}
      className="validate"
      onChange={onChange}
      ref={inputRef}
    />
    <label className="active" htmlFor={id}>{label}</label>
  </div>;

export default InputField;
