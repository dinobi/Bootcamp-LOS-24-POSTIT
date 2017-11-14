import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';
import { onCreateGroup } from '../../actions';
import Logo from '../../images/postit-logo.png';
import {
  Header, Button, InputField, Modal,
  Form, Textarea, ErrorAlert
} from './';

/**
 * @class DashHeader
 * @extends {React.Component}
 */
class DashHeader extends React.Component {
  /**
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

  componentWillMount() {
    
    const token = localStorage.getItem('userAuth');
    if (token === null) {
      location.hash = '#login';
      return;
    }
    const decodeToken = jwtDecode(token);
    if (decodeToken.exp * 1000 < (new Date().getTime())) {
      localStorage.removeItem('userAuth');
      location.hash = '#login';
    }
  }
  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 50 });
  }

  onFocus(event) {
    event.preventDefault();
    this.setState({
      errorMessage: ''
    });
  }
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
 * @param {event} event
 * @return {void}
 */
  handleCreate(event) {
    event.preventDefault();
    let { groupname, description } = this;
    groupname = groupname.value.trim();
    description = description.value.trim();
    if (groupname === '' || description === '') {
      this.setState({ errorMessage: 'Error. All field are required to create a new group' });
    } else {
      const groupData = { groupname, description };
      this.props.onCreateGroup(groupData);
    }
  }
  /**
   * @returns {JSX} JSX
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
                <InputField
                  inputClass="input-field"
                  onFocus={this.onFocus}
                  placeholder="Enter a group name"
                  id="group_name"
                  type="text"
                  inputRef={(input) => { this.groupname = input; }}
                />
                <Textarea
                  onFocus={this.onFocus}
                  placeholder="Enter group description"
                  id="group-description"
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

const mapDispatchToProps = dispatch => (
  bindActionCreators({ onCreateGroup }, dispatch)
);


export default connect(null, mapDispatchToProps)(DashHeader);

