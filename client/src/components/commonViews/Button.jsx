import React from 'react';

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

export default Button;
