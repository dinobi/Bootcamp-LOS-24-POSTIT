import React from 'react';

const ListItem = ({ onClick, listClass, anchorClass, url, iconClass, name }) =>
  <li className={listClass}>
    <a href={url}
      onClick={onClick}
      className={anchorClass}
    >
      <i className={iconClass}></i>&nbsp;&nbsp;{name}
    </a>
  </li>;

export default ListItem;
