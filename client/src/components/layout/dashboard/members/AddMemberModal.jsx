import React from 'react';
import {
  Modal, Form, InputField,
  Button, ErrorAlert
} from '../../../commonViews';

class AddMemberModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
    this.handleAddMember = this.handleAddMember.bind(this);
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
    return (
      <Modal action={addMemberButton} modalTitle={modalTitle}
      >
        <Form id="create-group-form" onSubmit={this.handleAddMember}>
          <InputField
            inputClass="input-field"
            onFocus={this.onFocus}
            placeholder="Enter a username"
            id="username"
            type="text"
            inputRef={(input) => { this.username = input; }}
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
    );
  }
}


export default AddMemberModal;
