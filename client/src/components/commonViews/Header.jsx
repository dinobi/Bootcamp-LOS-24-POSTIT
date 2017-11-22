import React from 'react';
import Logo from '../../images/postit-logo.png';

const Header = ({ children, handleClick, headerClass, container, logoClass }) =>
  <header className={headerClass}>
  <nav className="amber">
    <div className={container}>
      <a href='#/' className={logoClass}>
        <img src={Logo} alt="postit-logo"/></a>
      <a aria-label="mobile-menu" className="nav-mobile" onClick={ handleClick }>
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

export default Header;
