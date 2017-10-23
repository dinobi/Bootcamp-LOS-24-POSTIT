import React from 'react';

class ModalMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false,
      errorMessage: ''
    };
    this.modalToggle = this.modalToggle.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.handleAddMember = this.handleAddMember.bind(this);
  }
  /**
   *
   * @memberof ModalMain
   * @returns {Object} - new state
   */
  modalToggle() {
    this.setState({ modalOpened: !this.state.modalOpened });
  }
  /**
   *
   * @memberof ModalMain
   * @returns {Objects} - new state
   */
  onFocus() {
    this.setState({
      errorMessage: ''
    });
  }
  handleAddMember(event) {
    event.preventDefault();
    let { username } = this;
    username = username.value.trim();
    if (username === '') {
      this.setState({
        errorMessage: 'Error. All field are required to add member'
      });
    } else {
      const user = { username };
      this.props.addMemberModal.onAddMember(user);
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
    const { addMemberButton, modalTitle } = this.props.addMemberModal;
    const coverClass = this.state.modalOpened ? 'modal-cover modal-cover-active' : 'modal-cover';
    const containerClass = this.state.modalOpened ? 'modal-container modal-container-active' : 'modal-container';
    return (
      <div>
        <a onClick={this.modalToggle}>
					{addMemberButton}
				</a>
        <div className={containerClass}>
          <div className='modal-header'>
            <h5 className="black-text">
              {modalTitle}
            <i className="fa fa-times right" onClick={this.modalToggle}>
            </i>
            </h5>
          </div>
          <div className='modal-body'>
            <form id="create-group-form" onSubmit = { this.handleAddMember }>
              <fieldset className="input-field">
                <input
                  onFocus = { this.onFocus }
                  placeholder="Enter a username"
                  id="username"
                  type="text"
                  className="validate"
                  ref={(input) => { this.username = input; }}
                />
                <label className="active" htmlFor="username">
                  Username
                </label>
                {this.state.errorMessage === '' ? '' :
                  <p className="alert error-alert">
                    <i className="fa fa-exclamation-triangle"></i>
                    &nbsp;{this.state.errorMessage}
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


export default ModalMain;
