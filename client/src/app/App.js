import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import 'jquery';
import '../components/helpers/main';
import MessageBox from '../components/views/message-box';
import { Landing, Register, Login, MySpace, Groups, Search, SearchWiki, AccountDetails 
} from '../components/layout'
import '../styles/base.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <MessageBox/>
      </div>
    );
  }
}

export default App;
