import React from 'react';

const Button = ({ id, type, name, btnClass, disabled }) =>
  <button disabled={disabled} id={id} type={type} className={btnClass}>
    {name}
  </button>;

export default Button;
