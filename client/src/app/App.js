import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import 'jquery';
import '../components/helpers/mobile-nav';
import '../components/helpers/wiki-search';
import { GroupCard } from '../components/views'
import { 
  Landing, Register, Login, MySpace, Groups, Search, SearchWiki, AccountDetails 
} from '../components/layout'
import '../styles/base.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <SearchWiki />
      </div>
    );
  }
}

export default App;
