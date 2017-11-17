import React from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';
import 'jquery';
import {
  Register, Login, RequestPassword,
  ResetPassword, Dashboard, Groups,
  Group, SearchWiki, AccountDetails,
  NewGroup
} from '../components/layout';
import IndexHome from '../components/layout/home/IndexHome.jsx';
import NotFound from '../components/layout/home/NotFound.jsx';
import '../styles/base.scss';

const App = () =>
  (
    <Router>
      <Switch>
        <Route exact path='/' component={ IndexHome } />
        <Route path='/register' component={ Register } />
        <Route path='/login' component={ Login } />
        <Route path='/request-password' component={ RequestPassword } />
        <Route path='/reset-password/:hash' component={ ResetPassword } />
        <Route exact path='/dashboard' component={ Dashboard }/>
        <Route exact path='/groups' component={ Groups } />
        <Route path='/create-group' component={ NewGroup } />
        <Route path='/groups/:groupname' component={ Group } />
        <Route path='/search-wiki' component={ SearchWiki } />
        <Route path='/account-details' component={ AccountDetails } />
        <Route component={ NotFound } />
      </Switch>
    </Router>
  );

export default App;
