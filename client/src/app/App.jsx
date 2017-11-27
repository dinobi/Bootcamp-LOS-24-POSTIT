import React from 'react'; // eslint-disable-line no-unused-vars
import {
  Switch, // eslint-disable-line no-unused-vars
  HashRouter as Router, // eslint-disable-line no-unused-vars
  Route // eslint-disable-line no-unused-vars
} from 'react-router-dom';
import 'jquery';
import {
  Register, Login, RequestPassword,
  ResetPassword, Dashboard, Groups,
  Group, SearchWiki, NewGroup
} from '../components/layout';
import { Home, NotFound } from '../components/commonViews';
import '../styles/index.scss';

/**
 * App Component
 * @method App
 * @returns {Object} JSX
 */
const App = () =>
  (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/request-password' component={RequestPassword} />
        <Route path='/reset-password/:hash' component={ResetPassword} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/groups' component={Groups} />
        <Route path='/create-group' component={NewGroup} />
        <Route path='/groups/:groupname' component={Group} />
        <Route path='/search-wiki' component={SearchWiki} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );

export default App;
