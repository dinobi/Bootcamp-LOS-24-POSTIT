import React from 'react';
import Logo from '../../images/postit-logo.png'
import Modal from './modal';

class DashHeader extends React.Component {
	constructor() {
		super();
		this.state = {}
		this.handleClick = this.handleClick.bind(this);
	}
  handleClick(e) {	
    const mobileNav = $('#mobile-nav');
    mobileNav.html($('.menu-nav').html());
    if (mobileNav.hasClass('expanded')) {
      $('#mobile-nav.expanded').removeClass('expanded').slideUp(500);
      $('.nav-mobile').removeClass('open');
    } else {
      mobileNav.addClass('expanded').slideDown(500);
      $('.nav-mobile').addClass('open');
    }
	}
    render() {
			const actionName = <button className="btn btn-create">Create a new group</button>;
      return (
        <header className="dashboard-header">
					<nav className="amber">
						<div className="nav-wrapper">
							<a href="#dashboard" className="dashboard-logo">
								<img src={ Logo } alt="postit-logo"/></a>
							<a aria-label="mobile-menu" className="nav-mobile" onClick={ () => this.handleClick() }>
								<span></span>
								<span></span>
								<span></span>
							</a>
							<ul className="nav-list right hide-on-small-and-down">
								<li className="nav-item">
									<Modal action={actionName} />
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

export default DashHeader;

