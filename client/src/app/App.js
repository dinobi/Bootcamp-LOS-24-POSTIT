import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import 'jquery';
import {
  IndexHome, Register, Login, RequestPassword,
  ResetPassword, Dashboard, Groups,
  Group, Search, SearchWiki, AccountDetails,
  NewGroup
} from '../components/layout';
import '../styles/base.scss';

const App = () =>
  (
    <Router>
      <div>
        <Route exact path='/' component={ IndexHome } />
        <Route path='/register' component={ Register } />
        <Route path='/login' component={ Login } />
        <Route path='/request-password' component={ RequestPassword } />
        <Route path='/reset-password:hash' component={ ResetPassword } />
        <Route exact path='/dashboard' component={ Dashboard }/>
        <Route exact path='/groups' component={ Groups } />
        <Route path='/create-group' component={ NewGroup } />
        <Route path='/groups/:groupname' component={ Group } />
        <Route path='/search' component={ Search } />
        <Route path='/search-wiki' component={ SearchWiki } />
        <Route path='/account-details' component={ AccountDetails } />
      </div>
    </Router>
  );

export default App;
