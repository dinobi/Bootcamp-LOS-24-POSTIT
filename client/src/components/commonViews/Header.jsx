import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import Logo from '../../images/postit-logo.png';

/**
 * Header Component
 * Displays a page header where required
 *
 * @method Header
 * @returns {Object} JSX
 * @param {Object} props
 */
const Header = ({ children, handleClick, headerClass, container, logoClass }) =>
  <header className={headerClass}>
    <nav className="amber">
      <div className={container}>
        <a href='#/' className={logoClass}>
          <img src={Logo} alt="postit-logo" /></a>
        <a
          aria-label="mobile-menu"
          className="nav-mobile"
          onClick={handleClick}
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
        {children}
      </div>
      <div className="mobile-nav-wrapper">
        <div className="container" id="mobile-nav"></div>
      </div>
    </nav>
  </header>;

Header.defaultProps = {
  handleClick: () => { },
  headerClass: '',
  logoClass: ''
};
Header.propTypes = {
  handleClick: PropTypes.func.isRequired,
  headerClass: PropTypes.string.isRequired,
  logoClass: PropTypes.string.isRequired,
  container: PropTypes.string
};

export default Header;
