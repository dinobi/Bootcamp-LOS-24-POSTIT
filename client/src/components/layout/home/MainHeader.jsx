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

