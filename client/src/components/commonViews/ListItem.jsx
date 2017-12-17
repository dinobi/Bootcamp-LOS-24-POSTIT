import React from 'react';
import PropTypes from 'prop-types';

/**
 * ListItem Component
 * Displays a single list item and an additional icon where
 * required
 *
 * @method ListItem
 *
 * @returns {Object} JSX
 *
 * @param {Object} props
 */
const ListItem =
  ({ onClick, listClass, id, anchorClass, url, iconClass, name }) =>
    <li className={listClass} key={id}>
      <a href={url}
        onClick={onClick}
        className={anchorClass}
      >
        <i className={iconClass}></i>&nbsp;&nbsp;{name}
      </a>
    </li>;

ListItem.defaultProps = {
  listClass: '',
  onClick: () => { },
  anchorClass: '',
  iconClass: '',
  url: '',
  name: ''
};
ListItem.propTypes = {
  listClass: PropTypes.string.isRequired,
  id: PropTypes.number,
  onClick: PropTypes.func,
  anchorClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default ListItem;
