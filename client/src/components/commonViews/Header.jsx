import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../images/postit-logo.png';
import { ListItem } from './';

/**
 * Header Component
 * Displays a page header where required
 *
 * @method Header
 *
 * @returns {Object} JSX
 *
 * @param {Object} props
 */
const Header = ({ headerClass, children, logoClass, container }) =>
  <header className={headerClass}>
    <nav className="amber">
      <div className={container}>
        <a href="/#" className={logoClass}>
          <img src={Logo} alt="postit-logo" />
        </a>
        <a
          data-activates="mobile-menu"
          className="button-collapse right"
        >
          <i className="material-icons">menu</i>
        </a>
        <ul id="desktop" className="right">
          { children }
        </ul>
        <ul className="side-nav" id="mobile-menu">
          { children }
        </ul>
      </div>
    </nav>
  </header>;

Header.defaultProps = {
  navLink: {},
  headerClass: ''
};
Header.propTypes = {
  navLink: PropTypes.object.isRequired,
  headerClass: PropTypes.string.isRequired
};

export default Header;
