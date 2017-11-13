import React from 'react';

const Select = ({ children, id, selectRef, selectClass }) =>
<select id={id} ref={selectRef} className={selectClass}>
  { children }
</select>;

export default Select;
