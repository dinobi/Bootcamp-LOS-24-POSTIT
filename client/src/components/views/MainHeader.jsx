import React from 'react';
import Logo from '../../images/postit-logo.png';

/**
 *
 *
 * @class MainHeader
 * @extends {React.Component}
 */
class MainHeader extends React.Component {
	constructor() {
		super();
		this.state = {};
		this.handleClick = this.handleClick.bind(this);
	}
	/**
	 *
	 *
	 * @param {any} event
	 * @memberof MainHeader
	 * @returns {action} action - open and close navigation
	 */
  handleClick(event) {	
    const mobileNav = $('#mobile-nav');
    mobileNav.html($('.nav-list').html());
    if (mobileNav.hasClass('expanded')) {
      $('#mobile-nav.expanded').removeClass('expanded').slideUp(500);
      $('.nav-mobile').removeClass('open');
    } else {
      mobileNav.addClass('expanded').slideDown(500);
      $('.nav-mobile').addClass('open');
    }
	}
	/**
	 *
	 *
	 * @returns {*} jsx
	 * @memberof MainHeader
	 */
    render() {
			const { active } = this.props;
      return (
        <header>
					<nav className="amber">
						<div className="container nav-wrapper">
							<a href="#/" className="postit-logo">
								<img src={Logo} alt="postit-logo"/></a>
							<a aria-label="mobile-menu" className="nav-mobile" onClick={ () => this.handleClick() }>
								<span></span>
								<span></span>
								<span></span>
							</a>
							<ul className="nav-list right hide-on-small-and-down">
								<li className="nav-item"><a href="api-docs">API Docs</a></li>
								<li className="nav-item"><a href="#login">Login</a></li>
								<li className="nav-item"><a href="#register">Register</a></li>
								<li className="nav-item">
									<a href="#login">
										<button className="btn btn-create">
											Create a new group
										</button>
									</a>
								</li>
							</ul>
						</div>
						<div className="mobile-nav">
							<div className="container" id="mobile-nav"></div>
						</div>
					</nav>
				</header>
      );
    }
}

export default MainHeader;

