import React from 'react';
import apiHandler from '../../../../components/helpers/api-handler';
import SearchResult // eslint-disable-line no-unused-vars
  from '../search/SearchResult.jsx';
import {
  Modal, Form, // eslint-disable-line no-unused-vars
  InputField, ErrorAlert // eslint-disable-line no-unused-vars
} from '../../../commonViews';

/**
 * AddMemberModal
 * Displays a modal for searching and adding
 * new group members
 *
 * @class AddMemberModal
 * @extends {React.Component}
 */
class AddMemberModal extends React.Component {
  /**
   * Creates an instance of AddMemberModal.
   * @param {any} props
   * @memberof AddMemberModal
   */
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
  /**
   * onFocus()
   * This method is called when the user focuses on an input field,
   * which clear any error messages afterwards.
   *
   * @memberof AddMemberModal
   * @returns {void}
   */
  onFocus() {
    this.setState({ message: '' });
  }
  /**
   * handleSearch()
   * This method performs search for users
   * according to usrername
   *
   * @returns {array} array of found users
   * @param {any} [page=this.state.prevPage + 1]
   * @memberof AddMemberModal
   */
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
            this.setState({
              message: `No username with *${searchTerm}* was found`
            });
          }
        }
        );
    }
  }
  /**
   * handlePageNav
   *
   * This method is called when a user hits the
   * next or previous page button and it performs
   * returns result for that page
   *
   * @returns {array} array of users
   * @param {any} page
   * @memberof AddMemberModal
   */
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
   * handleAddMember()
   * This method is called when a user
   * hits the add member button
   *
   * @param {Object} selectedUser - selected user object
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
   * @returns {jsx} jsx of AddMemberModal
   * @memberof AddMemberModal
   */
  render() {
    const { addMemberButton, modalTitle } = this.props.addMemberModal;
    const { foundUsers, message,  } = this.state;
    return (
      <Modal action={addMemberButton} modalTitle={modalTitle}
      >
        <Form id="search-form" onSubmit={this.handleAddMember}>
          <fieldset id="search-field">
            <InputField
              id="search"
              inputClass="input-field"
              onFocus={this.onFocus}
              placeholder="Search by username"
              type="search"
              onChange={() => this.handleSearch()}
              inputRef={(input) => { this.searchTerm = input; }}
            />
          </fieldset>
          {
            this.state.message === '' ? '' :
              <h5 className="black-text">{message}</h5>
          }
          <SearchResult
            foundUsers={foundUsers}
            handleAddMember={this.handleAddMember}
          />
          {
            foundUsers.length > 9 ?
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
            </div> :
            ''
          }
        </Form>
      </Modal>
    );
  }
}

export default AddMemberModal;
