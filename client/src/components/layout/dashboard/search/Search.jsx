import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import onSearch from '../../../../actions/search';
import SearchBox from './SearchBox.jsx';
import SearchResult from './SearchResult.jsx';
import {
  DashHeader, InputField,
  SideMenu, Form, Copyright
} from '../../../commonViews';
/**
 * SearchWiki layout component that enables a user search wikipedia right from the dashboard.
 */
class Search extends React.Component {
  /**
   * Creates an instance of Search.
   * @param {*} props - class properties
   * @memberof Search
   */
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      searchItem: ''
    };
    this.onFocus = this.onFocus.bind(this);
    this.handlesearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /**
   *
   * @memberof Search
   * @returns {Object} - new state
   */
  onFocus() {
    this.setState({ errorMessage: '' });
  }
  /**
   *
   * @param {any} event
   * @memberof Search
   * @returns {Object} - searchItem
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      searchItem: event.target.value
    });
  }
  /**
   *
   * @param {any} event
   * @memberof Search
   * @returns {Object} - search query and context
   */
  handleSearch(event) {
    event.preventDefault();
    const search = this.searchArea.value.trim();
    const searchItem = this.state.searchItem.trim();
    if (searchItem === '' || search === '') {
      this.setState({
        errorMessage: 'All fields are required'
      });
      return;
    }
    let searchOption;
    if (search === 'users') {
      searchOption = this.searchOptionUser.value.trim();
    } else {
      searchOption = this.searchOptionGroup.value.trim();
    }
    const searchQuery = { search, [searchOption]: searchItem };
    this.props.onSearch(searchQuery);
  }

  render() {
    return (
      <div>
        <DashHeader />
        <main className="dashboard-ui">
          <div className="row">
            <aside className="col s12 m3 l2 hide-on-small-and-down">
              <SideMenu active="search" />
            </aside>
            <section className="col s12 m5 l10">
              <div className="dashboard-content dashboard-search">
                <div className="bot-msg">
                  <h3>Search PostIt</h3>
                  <p>
                    Search postit for family, friends or collegues and the
                    groups they belong.
                  </p>
                </div>
                <div className="col s12 m7 l7">
                  <form id="search-form">
                    <fieldset className="search-term">
                      <div className="row">
                        <div className="col s6">
                          <input type="checkbox" className="amber" id="users"
                            onFocus = { this.onFocus }
                            value ="users"
                            ref={(input) => { this.searchArea = input; }}
                          />
                          <label htmlFor="users">Users</label>
                          <select id="search-field"
                            ref={(input) => { this.searchOptionUser = input; }}
                            className="browser-default action-btn select"
                          >
                            <option value="username">username</option>
                            <option value="firstname">firstname</option>
                            <option value="lastname">lastname</option>
                            <option value="email">email</option>
                          </select>
                        </div>
                        {/* <div className="col s6">
                          <input type="checkbox" className="amber" id="groups"
                            value ="groups"
                            onFocus = { this.onFocus }
                            ref={(input) => { this.searchArea = input; }}
                          />
                          <label htmlFor="groups">Groups</label>
                          <select id="search-field"
                            ref={(input) => { this.searchOptionGroup = input; }}
                            className="browser-default action-btn select"
                          >
                            <option value="groupname">groupname</option>
                            <option value="description">description</option>
                          </select>
                        </div> */}
                      </div>
                      <SearchBox
                        searchContext = "search-postit"
                        searchItem = { this.state.searchItem }
                        handleChange = { this.handleChange }
                        handleSearch = { this.handlesearch }
                        onFocus = { this.onFocus }
                      />
                    </fieldset>
                  </form>
                  {
                    this.state.errorMessage === '' ? '' :
                    <p className="alert error-alert">
                      <i className="fa fa-exclamation-triangle"></i>
                      &nbsp;{this.state.errorMessage}
                    </p>
                  }
                </div>
                <div className="col s12 m5 l5">
                  <SearchResult
                    searchResult={ this.props.searchResult }
                    message={this.props.searchResult}
                  />
                </div>
              </div>
            </section>
          </div>
          <Copyright />
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  searchResult: state.searchResult
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ onSearch }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
