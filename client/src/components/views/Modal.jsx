import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onCreateGroup } from '../../actions';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false,
      errorMessage: '',
      message: ''
    };
    this.modalToggle = this.modalToggle.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }
  /**
   *
   * @memberof Modal
   * @returns {Object} - new state
   */
  modalToggle() {
    this.setState({
      modalOpened: !this.state.modalOpened
    });
  }
  /**
   *
   * @memberof Modal
   * @returns {Object} - new state
   */
  onFocus() {
    this.setState({
      errorMessage: '',
      message: ''
    });
  }
  /**
   * handleLogin()
   * @param {event}
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
   * Dashboard layout component that enables users create new a new group.
   * 
   * @param {component} <DashHeader/> - The dashboard header navigation.
   * @param {component} <SideMenu/> - The dashboard side menu for navigation to other dashboard gui.
   * @param {component} <Copyright/> - The dashboard footer copyright information.
   */

  render() {
    const coverClass = this.state.modalOpened ? 'modal-cover modal-cover-active' : 'modal-cover';
    const containerClass = this.state.modalOpened ? 'modal-container modal-container-active' : 'modal-container';
    return (
      <div>
        <a onClick={this.modalToggle}>
					{this.props.action}
				</a>
        <div className={containerClass}>
          <div className='modal-header'>
            <h5 className="black-text">
              Create a new group
            <i className="fa fa-times right" onClick={this.modalToggle}>
            </i>
            </h5>
          </div>
          <div className='modal-body'>
            <form id="create-group-form" onSubmit = { this.handleCreate }>
              <fieldset className="input-field">
                <input
                  onFocus = { this.onFocus }
                  placeholder="Enter a group name"
                  id="group_name"
                  type="text"
                  className="validate"
                  ref={(input) => { this.groupname = input; }}
                />
                <textarea
                  onFocus = { this.onFocus }
                  placeholder="Enter group description"
                  id="group-description"
                  className="validate"
                  ref={(input) => { this.description = input; }}
                />
                {this.state.errorMessage === '' ? '' :
                  <p className="alert error-alert">
                    <i className="fa fa-exclamation-triangle"></i>
                    &nbsp;{this.state.errorMessage}
                  </p>
                }
                {this.state.message === '' ? '' :
                  <p className="alert info-alert">
                    <i className="fa fa-exclamation-triangle"></i>
                    &nbsp;{this.state.message}
                  </p>
                }
              </fieldset>
              <button type="submit" className="btn btn-create">
                Submit
              </button>
            </form>
          </div>
          <div className='modal-footer'></div>
        </div>
        <div className={coverClass} onClick={this.modalToggle}></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.newGroup.message,
  // messages: state.messages
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ onCreateGroup }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(Modal);
