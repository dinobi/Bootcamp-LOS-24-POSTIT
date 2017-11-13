import React from 'react';

const IconButton = ({ iconClass, dataPosition, dataDelay, dataTooltip, onClick }) =>
  <i className={iconClass}
    data-position={dataPosition}
    data-delay={dataDelay}
    data-tooltip={dataTooltip}
    onClick= {onClick}
  />;

export default IconButton;
