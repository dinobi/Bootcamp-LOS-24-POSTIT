import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import 'jquery';
import '../components/helpers/mobile-nav';
import '../components/helpers/wiki-search';
import { Landing, Register, Login, MySpace, Groups, Group, Search, AccountDetails } from '../components/layout'
import '../styles/base.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Groups/>
      </div>
    );
  }
}

export default App;
