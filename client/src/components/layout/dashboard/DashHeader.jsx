import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert';
import { onCreateGroup, onLoginUser } from '../../../actions';
import {
  Header, Button, // eslint-disable-line no-unused-vars
  InputField, Modal, // eslint-disable-line no-unused-vars
  Form, Textarea, // eslint-disable-line no-unused-vars
  ErrorAlert, IconButton // eslint-disable-line no-unused-vars
} from '../../commonViews';

/**
 * DashboardHeader Component
 *
 * @class DashHeader
 * @extends {React.Component}
 */
class DashHeader extends React.Component {
  /**
   * Creates an instance of DashboardHeader
   *
   * @param {any} props
   * @memberof DashHeader
   */
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  /**
   * @returns {void}
   * @memberof DashHeader
   */
  componentWillMount() {
    const token = localStorage.getItem('userAuth');
    if (token === null) {
      location.hash = '#login';
      return;
    }
    const decodeToken = jwtDecode(token);
    if (decodeToken.exp * 1000 < (new Date().getTime())) {
      const username = decodeToken.data.username;
      swal({
        text: 'enter password to re-authenticate',
        content: {
          element: 'input',
          attributes: {
            placeholder: 'Type your password',
            type: 'password',
          },
        },
      }).then((password) => {
        this.props.onLoginUser({ username, password });
      });
    }
  }
  /**
   * @returns {void}
   * @memberof React
   */
  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 50 });
  }

  /**
   * This method is called when DOM element is on focus eg: input field,
   * if the state of the field has errored, the error is cleared.
   *
   * @returns {void}
   */
  onFocus() {
    this.setState({
      errorMessage: ''
    });
  }
  /**
   * handleClick()
   * This method is called when the user clicks on the "Menu Icon"
   * It displays a dropdown of menu items
   *
   * @returns {void}
   * @memberof DashHeader
   */
  handleClick() {
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
  /**
   * handleCreate()
   * This method is called when the user clicks on the "Create group"
   * It displays makes an api call that handles group creation
   *
   * @param {event} event
   * @return {void}
   */
  handleCreate(event) {
    event.preventDefault();
    let { groupname, description } = this;
    groupname = groupname.value.trim();
    description = description.value.trim();
    if (groupname === '' || description === '') {
      this.setState({
        errorMessage: 'Error. All field are required to create a new group'
      });
    } else {
      const groupData = { groupname, description };
      this.props.onCreateGroup(groupData);
    }
  }
  /**
   * @returns {jsx} jsx component for dashboad header
   * @memberof DashHeader
   */
  render() {
    const createGroup =
      <Button
        btnClass="btn btn-create"
        name="Create a new group"
      />;
    return (
      <Header
        headerClass="dashboard-header"
        container="nav-wrapper"
        logoClass="dashboard-logo"
        handleClick={() => this.handleClick()}
      >
        <ul className="nav-list right hide-on-small-and-down">
          <li className="nav-item">
            <Modal action={createGroup} modalTitle="Create a new group">
              <Form id="create-group-form" onSubmit={this.handleCreate}>
                <p>Name:</p>
                <InputField
                  inputClass="input-field"
                  onFocus={this.onFocus}
                  placeholder="Enter a group name"
                  type="text"
                  inputRef={(input) => { this.groupname = input; }}
                />
                <p>Description:</p>
                <Textarea
                  onFocus={this.onFocus}
                  placeholder="Enter group description"
                  textRef={(input) => { this.description = input; }}
                />
                {
                  this.state.errorMessage === '' ? '' :
                    <ErrorAlert
                      errorMessage=
                      {this.state.errorMessage}
                    />
                }
                <Button
                  type="submit"
                  btnClass="btn btn-create"
                  name="Submit"
                />
              </Form>
            </Modal>
          </li>
        </ul>
      </Header>
    );
  }
}

DashHeader.propTypes = {
  onCreateGroup: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ onCreateGroup, onLoginUser }, dispatch)
);


export default connect(null, mapDispatchToProps)(DashHeader);

