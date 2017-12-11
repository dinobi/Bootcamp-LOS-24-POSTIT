/* eslint-disable-line no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link }
from 'react-router-dom';
import { onLogoutUser } from '../../../actions';
import { Header, Button, ListItem }
from '../../commonViews';
import authUser from '../../helpers/authUser';

/**
 * MainHeader Compopnent
 *
 * @class MainHeader
 * @extends {React.Component}
 */
export class MainHeader extends React.Component {
	/**
	 * Creates an instance of MainHeader.
	 * @memberof MainHeader
	 */
  constructor() {
    super();
    this.state = {
      isAuthenticated: false
    };
  }
	/**
	 * handleClick()
   * This method is called when the user clicks on the "Menu Icon"
   * It displays a dropdown of navigation menu items
	 *
	 * @memberof MainHeader
	 * @returns {void}
	 */
  componentDidMount() {
    $('.button-collapse').sideNav({
      menuWidth: 300,
      closeOnClick: true,
      edge: 'right'
    });
    this.setState({
      isAuthenticated: authUser().userIsAuthenticated
    });
  }
	/**
	 *
	 * @returns {*} jsx for MainHeader
	 * @memberof MainHeader
	 */
  render() {
    const { isAuthenticated } = this.state;
    return (
			<Header
				headerClass='main-header'
				container="container nav-wrapper"
				logoClass="postit-logo"
			>
				<li className="nav-item"><a href="api-docs">API DOCS</a></li>
				<li className="nav-item">
					{
						isAuthenticated ?
							<a onClick={this.props.onLogoutUser}>
								LOGOUT
							</a>
							:
							<a href="#login">LOGIN</a>}
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
			</Header>
    );
  }
}

MainHeader.defaultProp = {
  onLogoutUser: () => { }
};
MainHeader.propTypes = {
  onLogoutUser: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ onLogoutUser }, dispatch);

export default connect(null, mapDispatchToProps)(MainHeader);

