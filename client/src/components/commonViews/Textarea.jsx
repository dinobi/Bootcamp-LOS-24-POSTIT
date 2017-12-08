import React from 'react';
import PropTypes from 'prop-types';

/**
 * TextArea Component
 * Displays a textarea for composing posts
 *
 * @method TextArea
 * @returns {Object} JSX
 * @param {Object} props
 */
const TextArea = ({ onFocus, placeholder, id, textRef }) =>
  <textarea
    onFocus={onFocus}
    placeholder={placeholder}
    id={id}
    className="validate"
    ref={textRef}
  />;

TextArea.defaultProps = {
  onFocus: () => { },
  placeholder: 'always be nice...',
  id: '',
  textRef: () => { },
};
TextArea.propTypes = {
  onFocus: PropTypes.func.isRequired,
  placholder: PropTypes.string,
  id: PropTypes.string,
  textRef: PropTypes.func.isRequired
};

export default TextArea;
