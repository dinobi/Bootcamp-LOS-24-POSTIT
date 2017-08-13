import React from 'react';
import { DashHeader, SideMenu, SearchForm, Copyright } from '../../views';
import $ from 'jquery';

class SearchWiki extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchQuery: e.target.value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    $.ajax({
        type: 'GET',
        url: `https://en.wikipedia.org/w/api.php?action=opensearch&search=
        ${this.state.searchQuery}&format=json&callback=?`,
        dataType: 'json',
        cache: false,
        success: (data) => {
          let searchTitle = data[0];
          let resultTitle = data[1];
          let resultBody = data[2]
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
                  <SearchForm searchContext = "search-wiki"
                    searchQuery={ this.state.searchQuery }
                    handleChange={ this.handleChange }
                    handleClick={ this.handleClick }/>
                </fieldset>
              </form>
            <section className="search-result">
				    </section>
          </div>
          </section>
          </div>
          <Copyright/>
        </main>
      </div>
    );
  }
}

export default SearchWiki;