import React from "react";
import {
  DashHeader,
  SideMenu,
  SearchForm,
  SearchResult,
  Copyright
} from "../../views";
import api from "../../helpers/api";

class Search extends React.Component {
/**
 * SearchWiki layout component that enables a user search wikipedia right from the dashboard.
 * 
 * @constructor
 * @param {object} state - Handle state of the value of searchQuery and searchResult.
 * @param {function} handleChange - Listener for changes to search query.
 * @param {function} handleClick - Listener for click event on search button in order to send search query.
 * 
 * @param {component} <DashHeader/> - The dashboard header navigation.
 * @param {component} <SearchForm> - Search form gui for user to perform search request.
 * @param {component} <SearchResult> - Search result gui for user to view and act on search result.
 * @param {component} <SideMenu/> - The dashboard side menu for navigation to other dashboard gui.
 * @param {component} <FeatureCard/> - Card that contains quick link to post features.
 * @param {component} <Copyright/> - The dashboard footer copyright information.
 */

  constructor() {
    super();
    this.state = {
      searchQuery: "",
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
            <aside className="col s12 m3 l2">
              <SideMenu />
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
