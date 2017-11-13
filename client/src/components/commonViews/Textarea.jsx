import React from 'react';

const TextArea = ({ onFocus, placeholder, id, textRef }) =>
  <textarea
    onFocus={onFocus}
    placeholder={placeholder}
    id={id}
    className="validate"
    ref={textRef}
  />;

export default TextArea;
