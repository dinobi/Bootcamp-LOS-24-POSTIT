import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, IndexRoute, hashHistory } from 'react-router-dom';
import 'jquery';
import '../components/helpers/main';
import { Landing, Register, Login, MySpace, Groups, Group, Search, SearchWiki, AccountDetails, MessageBoard, NewGroup
} from '../components/layout'
import NotFound from '../components/helpers/not-found'
import '../styles/base.css';

class App extends React.Component {
  render() {
    return (
      <Router history = { hashHistory }>
        <div>
          <Route exact path='/' component={ Landing }/>
          <Route path='/register' component={ Register }/>
          <Route path='/login' component={ Login }/>
          <Route exact path='/my-space' component={ MySpace }/>
          <Route path='/create-group' component={ NewGroup }/>
          <Route exact path='/groups' component={ Groups }/>
          <Route exact path='/groups/:group-name' component={ Group }/>
          <Route path='/groups/:group-name/message-board' component={ MessageBoard }/>
          <Route path='/groups/:group-name/members' component={ Group }/>
          <Route path='/search' component={ Search }/>
          <Route path='/search-wiki' component={ SearchWiki }/>
          <Route path='/account-details' component={ AccountDetails }/>
        </div>   
      </Router>
    );
  }
}

export default App;
