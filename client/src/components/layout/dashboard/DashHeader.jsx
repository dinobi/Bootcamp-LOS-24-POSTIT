import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import authUser from '../../helpers/authUser';
import {
  onLoginUser,
  onLogoutUser
} from '../../../actions';
import {
  Header, Button, // eslint-disable-line no-unused-vars
  InputField, Modal, // eslint-disable-line no-unused-vars
  Form, Textarea, // eslint-disable-line no-unused-vars
  ErrorAlert, IconButton, // eslint-disable-line no-unused-vars
  ListItem // eslint-disable-line no-unused-vars
} from '../../commonViews';

/**
 * DashboardHeader Component
 *
 * @class DashHeader
 * @extends {React.Component}
 */
export class DashHeader extends React.Component {
  /**
   * Creates an instance of DashboardHeader
   *
   * @param {any} props
   * @memberof DashHeader
   */
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }
  /**
   * @returns {void}
   * @memberof DashHeader
   */
  componentWillMount() {
    if (authUser() === false) {
      return this.props.onLogoutUser();
    }
    if (authUser().status === 'expired') {
      const username = authUser().username;
      swal({
        title: `Hi ${username}!`,
        text: 'Please login again to continue',
        buttons: false,
        timer: 2000,
      });
    }
  }
  /**
	 * This method is called when DOM elements are available
	 *
	 * @memberof DashHeader
	 * @returns {void}
	 */
  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 50 });
    $('.collapsible').collapsible();
    $('.dropdown-button').dropdown({
      constrainWidth: true,
    });
    $('.button-collapse').sideNav({
      menuWidth: 300,
      closeOnClick: true,
      edge: 'right'
    });
  }

  /**
   * @returns {jsx} jsx component for dashboad header
   * @memberof DashHeader
   */
  render() {
    const { active, back } = this.props;
    return (
      <Header
        headerClass="dashboard-header"
        container="nav-wrapper"
        logoClass="dashboard-logo"
        active={active}
      >
        <ListItem
          listClass="nav-item hidden"
          anchorClass={active === 'dashboard' ? 'active' : ''}
          url="#dashboard"
          name="My Space"
        />
        <ListItem
          listClass="nav-item hidden"
          anchorClass={active === 'groups' ? 'active' : ''}
          url="#groups"
          name="Groups Control"
        />
        <ListItem
          listClass="nav-item hidden"
          anchorClass={active === 'search-wiki' ? 'active' : ''}
          url="#search-wiki"
          name="Search Wikipedia"
        />
        {back}
        <li className="nav-item">
          <Button
            onClick={this.props.onLogoutUser}
            type="submit"
            btnClass="btn btn-create"
            name="Logout"
          />
        </li>
      </Header>
    );
  }
}

DashHeader.propTypes = {
  onLogoutUser: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    onLogoutUser
  }, dispatch)
);


export default connect(null, mapDispatchToProps)(DashHeader);

