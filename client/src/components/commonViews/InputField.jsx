import React from 'react';

const InputField = ({ inputClass, onFocus, type, id, placeHolder, inputRef, label }) =>
  <div className={inputClass}>
    <input
      onFocus = { onFocus }
      placeholder={placeHolder}
      id={id}
      type={type}
      className="validate"
      ref={inputRef}
    />
    <label className="active" htmlFor={id}>{label}</label>
  </div>;

export default InputField;
