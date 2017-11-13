import React from 'react';
import $ from 'jquery';
import requireAuth from '../../../helpers/requireAuth';
import SearchBox from './SearchBox.jsx';
import {
  DashHeader, InputField,
  SideMenu, Form, Copyright
} from '../../../commonViews';

class SearchWiki extends React.Component {
/**
 * SearchWiki layout component that enables a user search wikipedia right from the dashboard.
 * 
 * @constructor
 * @param {object} state - Handle state of the value of search query.
 * @param {function} handleChange - Listener for changes to search query.
 * @param {function} handleClick - Listener for click event on search button in order to send search query.
 * 
 * @param {component} <DashHeader/> - The dashboard header navigation.
 * @param {component} <SearchForm> - Search form gui for user to perform search request.
 * @param {component} <SideMenu/> - The dashboard side menu for navigation to other dashboard gui.
 * @param {component} <FeatureCard/> - Card that contains quick link to post features.
 * @param {component} <Copyright/> - The dashboard footer copyright information.
 */
  constructor() {
    super();
    this.state = {
      searchQuery: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchQuery: e.target.value
    });
  }

  handleSearch(e) {
    e.preventDefault();
    $.ajax({
      type: 'GET',
      url: `https://en.wikipedia.org/w/api.php?action=opensearch&search=
        ${this.state.searchQuery}&format=json&callback=?`,
      dataType: 'json',
      cache: false,
      success: (data) => {
        const searchTitle = data[0];
        const resultTitle = data[1];
        const resultBody = data[2];
        let content = `<div><h5>${searchTitle}</h5><br>`;
        if (data[2].length < 3) {
          content += `<p><em>${resultTitle}</em><br>${resultBody}</p></div>`;
          $('.search-result').html(content);
        } else {
          for (let i = 1; i < 10; i += 1) {
            content += `<p><em>${resultTitle[i]}</em><br>
            ${resultBody[i]}</p><br>`;
          }
          content += '</div>';
          $('.search-result').html(content);
        }
      },
      error: () => {
        $('.search-result').html('An error was encountered, try again soon!');
      }
    });
  }

  render() {
    return (
      <div>
        <DashHeader />
        <main className="dashboard-ui">
          <div className="row">
            <aside className="col s12 m3 l2 hide-on-small-and-down">
              <SideMenu active="search-wiki"/>
            </aside>
            <section className="col s12 m9 l10">
              <div className="dashboard-content dashboard-search">
                <div className="bot-msg">
                  <h3>Search Wikipedia</h3>
                  <p>Search wikipepdia right from your dashboard.</p>
                </div>
                <form id="search-form">
                  <fieldset className="search-term">
                    <SearchBox
                      searchContext="search-wiki"
                      searchQuery={this.state.searchTerm}
                      handleChange={this.handleChange}
                      handleSearch={this.handleSearch}
                    />
                  </fieldset>
                </form>
                <section className="search-result" />
              </div>
            </section>
          </div>
          <Copyright />
        </main>
      </div>
    );
  }
}

export default SearchWiki;
