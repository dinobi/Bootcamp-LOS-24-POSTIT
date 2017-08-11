import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import 'jquery';
import '../components/helpers/main';
import { Landing, Register, Login, MySpace, Groups, Search, SearchWiki, AccountDetails, MessageBoard
} from '../components/layout'
import '../styles/base.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <MessageBoard/>
      </div>
    );
  }
}

export default App;
