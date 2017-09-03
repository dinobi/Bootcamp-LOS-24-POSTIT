import React from 'react';
import {
  DashHeader,
  SideMenu,
  SearchForm,
  SearchResult,
  Copyright
} from '../../views';
import api from '../../helpers/api';
/**
 * SearchWiki layout component that enables a user search wikipedia right from the dashboard.
 */
class Search extends React.Component {
/**
 * SearchWiki Sets up a constructor and renders the following UI components.
 * 
 * @constructor -initial state - setup initial state of the value of searchQuery and searchResult.
 * @function handleChange - Listener for changes to search query.
 * @function handleClick - Listener for click event on search button in order to send search query.
 * 
 * @component <DashHeader/> - The dashboard header navigation.
 * @component <SearchForm> - Search form gui for user to perform search request.
 * @component <SearchResult> - Search result gui for user to view and act on search result.
 * @component <SideMenu/> - The dashboard side menu for navigation to other dashboard gui.
 * @component <FeatureCard/> - Card that contains quick link to post features.
 * @component <Copyright/> - The dashboard footer copyright information.
 */

  constructor() {
    super();
    this.state = {
      searchQuery: '',
      searchResult: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchQuery: e.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    //todo: make your search api call here

    const results = [];
    this.setState({
      searchResult: results
    });
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
            <section className="col s12 m9 l10">
              <div className="dashboard-content dashboard-search">
                <div className="bot-msg">
                  <h3>Search PostIt</h3>
                  <p>
                    Search postit for family, friends or collegues and the
                    groups they belong.
                  </p>
                </div>
                <form id="search-form">
                  <fieldset className="search-term">
                    <div className="row">
                      <div className="col s6">
                        <input type="checkbox" className="amber" id="users" />
                        <label htmlFor="users">Users</label>
                      </div>
                      <div className="col s6">
                        <input type="checkbox" className="amber" id="groups" />
                        <label htmlFor="groups">Groups</label>
                      </div>
                    </div>
                    <SearchForm
                      searchContext="search-postit"
                      searchQuery={this.state.searchQuery}
                      handleChange={this.handleChange}
                      handleClick={this.handleClick}
                    />
                  </fieldset>
                </form>
                <SearchResult searchResult={this.state.searchResult} />
              </div>
            </section>
          </div>
          <Copyright />
        </main>
      </div>
    );
  }
}

export default Search;
