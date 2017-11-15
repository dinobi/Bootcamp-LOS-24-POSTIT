import React from 'react';
import apiHandler from '../../../../components/helpers/api-handler';
import SearchResult from '../search/SearchResult.jsx';
import {
  Modal, Form, InputField, ErrorAlert
} from '../../../commonViews';

class AddMemberModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      foundUsers: [],
      nextPage: 2,
      prevPage: 0
    };
    this.handleAddMember = this.handleAddMember.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.handlePageNav = this.handlePageNav.bind(this);
  }

  onFocus() {
    this.setState({ message: '' });
  }

  handleSearch(page = this.state.prevPage + 1) {
    this.setState({ foundUsers: [], message: '' });
    const searchTerm = this.searchTerm.value.trim();
    let headers;
    const groupname =
    location.href.split('/')[location.href.split('/').length - 1];
    if (searchTerm !== '') {
      apiHandler(`/api/search/${groupname}/${searchTerm}/${page - 1}`,
        '', 'GET', headers).then(
        (users) => {
          const { userData } = users.data;
          if (users.data.userData.length > 0) {
            this.setState({ foundUsers: userData, message: '' });
          } else {
            this.setState({ message: `No username with *${searchTerm}* was found` });
          }
        }
      );
    }
  }

  handlePageNav(page) {
    if (this.searchTerm.value.trim() !== '') {
      if (page === 'prev') {
        if (this.state.prevPage > 0) {
          this.handleSearch(this.state.prevPage);
          this.setState({ nextPage: this.state.nextPage - 1 });
          this.setState({ prevPage: this.state.prevPage - 1 });
        }
      } else {
        this.handleSearch(this.state.nextPage);
        this.setState({ nextPage: this.state.nextPage + 1 });
        this.setState({ prevPage: this.state.prevPage + 1 });
      }
    }
  }
  /**
   *
   *
   * @param {Object} selectedUser - user object
   * @memberof AddMemberModal
   *
   * @returns {Object} new state
   */
  handleAddMember(selectedUser) {
    const { username } = selectedUser;
    this.props.addMemberModal.onAddMember({ username });
    const users = this.state.foundUsers.filter(
      user => selectedUser.username !== user.username
    );
    this.setState({ foundUsers: users });
  }
  /**
   *
   *
   * @returns {jsx} jsx 
   * @memberof AddMemberModal
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
            id="search"
            type="text"
            onChange={ () => this.handleSearch() }
            inputRef={(input) => { this.searchTerm = input; }}
          />
          {
            this.state.message === '' ? '' :
              <h5 className="black-text">{this.state.message}</h5>
          }
          <SearchResult
            foundUsers={this.state.foundUsers}
            handleAddMember={this.handleAddMember}
          />
            <div class="search-pages">
              <span onClick={() =>
                this.handlePageNav('prev')}
                className="search-prev"
              >
                <i className="fa fa-chevron-left"></i>
              </span>
              <span>
                {this.state.prevPage + 1}/{this.state.nextPage}
              </span>
              <span onClick={() =>
                this.handlePageNav('next')}
                className="search-next"
              >
              <i className="fa fa-chevron-right"></i>
              </span>
            </div>
        </Form>
      </Modal>
    );
  }
}


export default AddMemberModal;
