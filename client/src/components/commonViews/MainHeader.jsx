import React from 'react';
import { connect } from 'react-redux';
import Logo from '../../images/postit-logo.png';
import { Header, Button, ListItem } from './';

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
  handleClick() {
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
	 * @returns {*} jsx
	 * @memberof MainHeader
	 */
    render() {
      const { isAuthenticated } = this.props;
      return (
				<Header
					logoClass="postit-logo"
					container="container nav-wrapper"
					handleClick={ () => this.handleClick() }
				>
					<ul className="nav-list right hide-on-small-and-down">
						<li className="nav-item"><a href="api-docs">API DOCS</a></li>
						<li className="nav-item">
							{ isAuthenticated ? '' : <a href="#login">LOGIN</a> }
						</li>
						<li className="nav-item">
							<a href={isAuthenticated ? '#dashboard' : '#register'}>
								<Button
								btnClass="btn btn-create"
								name=
									{
										isAuthenticated ?
										'Dashboard' :
										'Register'
									}
								/>
							</a>
						</li>
					</ul>
				</Header>
      );
    }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.userIsAuthenticated,
});
export default connect(mapStateToProps)(MainHeader);

