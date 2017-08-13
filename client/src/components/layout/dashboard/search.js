import React from 'react';
import { DashHeader, SideMenu, SearchForm, SearchResult, Copyright } from '../../views';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      searchQuery: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <DashHeader/>
        <main className="dashboard-ui">
          <div className="row">
            <aside className="col s12 m3 l2">
              <SideMenu/>
            </aside>
            <section className="col s12 m9 l10">
              <div className="dashboard-content dashboard-search">
                <div className="bot-msg">
                  <h3>Search PostIt</h3>
                  <p>Search postit for family, friends or collegues and the groups they belong.</p>
                </div>
                <form id="search-form">
                  <fieldset className="search-term">
                    <div className="row">
                      <div className="col s6"><input type="checkbox" className="amber" id="users" />
                        <label htmlFor="users">Users</label>
                      </div>
                      <div className="col s6"><input type="checkbox" className="amber" id="groups" />
                        <label htmlFor="groups">Groups</label>
                      </div>
                    </div>
                    <SearchForm searchContext = "search-postit" 
                      searchQuery={ this.state.searchQuery } 
                      handleChange= { this.handleChange }/>
                  </fieldset>
                </form>
                <SearchResult/>
              </div>
            </section>
          </div>
          <Copyright/>
        </main>
      </div>
    );
  }
}

export default Search;