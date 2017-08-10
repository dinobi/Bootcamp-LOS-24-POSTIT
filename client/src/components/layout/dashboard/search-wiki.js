import React from 'react';
import { DashHeader, SideMenu, SearchForm } from '../../views';

class SearchWiki extends React.Component {
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
                  <h3>Search Wikipedia</h3>
                  <p>Search wikipepdia right from your dashboard.</p>
                </div>
                <form id="search-form">
				  <fieldset className="search-term">
                    <SearchForm SearchContext = { "#search-wiki" }/>
                  </fieldset>
                </form>
                <section class="search-result">
				</section>
              </div>
            </section>
          </div>
          <small class="dashboard-copy">&copy;Bootcamp24, Andela Nigeria. All rights reserved.</small>
        </main>
      </div>
    );
  }
}

export default SearchWiki;