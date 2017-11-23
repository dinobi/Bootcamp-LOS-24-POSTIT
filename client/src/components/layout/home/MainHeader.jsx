import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } // eslint-disable-line no-unused-vars
from 'react-router-dom';
import { onLogoutUser } from '../../../actions';
import { Header, Button, ListItem } // eslint-disable-line no-unused-vars
from '../../commonViews';

/**
 * MainHeader Compopnent
 *
 * @class MainHeader
 * @extends {React.Component}
 */
class MainHeader extends React.Component {
	/**
	 * Creates an instance of MainHeader.
	 * @memberof MainHeader
	 */
  constructor() {
    super();
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }
	/**
	 * handleClick()
   * This method is called when the user clicks on the "Menu Icon"
   * It displays a dropdown of navigation menu items
	 *
	 * @memberof MainHeader
	 * @returns {void}
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
	 * @returns {*} jsx for MainHeader
	 * @memberof MainHeader
	 */
  render() {
    const { isAuthenticated } = this.props;
    return (
			<Header
				logoClass="postit-logo"
				container="container nav-wrapper"
				handleClick={() => this.handleClick()}
			>
				<ul className="nav-list right hide-on-small-and-down">
					<li className="nav-item"><a href="api-docs">API DOCS</a></li>
					<li className="nav-item">
						{
							isAuthenticated ?
								<a onClick={this.props.onLogoutUser}>
									LOGOUT
								</a>
								:
								<Link to="login">LOGIN</Link>}
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

MainHeader.defaultProp = {
  isAuthenticated: false,
  onLogoutUser: () => { }
};
MainHeader.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.userIsAuthenticated,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ onLogoutUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);

