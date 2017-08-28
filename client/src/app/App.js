import 'babel-polyfill';
import React from 'react';
import {
  HashRouter as Router, Route, IndexRoute, hashHistory
} from 'react-router-dom';
import 'jquery';
import '../components/helpers/main';
import { Landing, Register, Login, ResetPassword, Dashboard, Groups,
  Group, Search, SearchWiki, AccountDetails, MessageBoard, Members, NewGroup
} from '../components/layout';
import '../styles/base.scss';

/**
 * App component that creates routing relationship between
 * all of the app layout components
 */
const App = () =>
  (
    <Router history = { hashHistory }>
      <div>
        <Route exact path='/' component={ Landing }/>
        <Route path='/register' component={ Register }/>
        <Route path='/login' component={ Login }/>
        <Route path='/reset-password' component={ ResetPassword }/>
        <Route exact path='/dashboard' component={ Dashboard }/>
        <Route path='/create-group' component={ NewGroup }/>
        <Route exact path='/groups' component={ Groups }/>
        <Route exact path='/groups/:group-name' component={ Group }/>
        <Route exact path='/group' component={ Group }/>
        <Route path='/groups/:group-name/message-board'
          component={ MessageBoard }
        />
        <Route path='/groups/:group-name/members' component={ Members }/>
        <Route path='/search' component={ Search }/>
        <Route path='/search-wiki' component={ SearchWiki }/>
        <Route path='/account-details' component={ AccountDetails }/>
      </div>
    </Router>
  );

export default App;
