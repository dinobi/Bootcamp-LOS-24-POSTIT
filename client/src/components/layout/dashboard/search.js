import React from 'react';
import { DashHeader, SideMenu, SearchForm } from '../../views';

class Search extends React.Component {
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
                        <label for="users">Users</label>
                      </div>
                      <div className="col s6"><input type="checkbox" className="amber" id="groups" />
                        <label for="groups">Groups</label>
                      </div>
                    </div>
                    <SearchForm SearchContext = "search-postit"/>
                  </fieldset>
                </form>
              </div>
            </section>
          </div>
          <small className="dashboard-copy">&copy;Bootcamp24, Andela Nigeria. All rights reserved.</small>
        </main>
      </div>
    );
  }
}

export default Search;