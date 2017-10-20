import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import 'jquery';
import { 
  IndexHome, Register, Login, RequestPassword,
  ResetPassword, Dashboard, Groups,
  Group, Search, SearchWiki, AccountDetails,
  MessageBoard, Members, NewGroup
} from '../components/layout';
import { Features } from '../components/views';
import '../styles/base.scss';

/** b cSting relationship between
 * all of the app layout components
 */
const App = () =>
  (
    <Router>
      <div>
        <Route exact path='/' component={ IndexHome } />
        <Route path='/register' component={ Register } />
        <Route path='/login' component={ Login } />
        <Route path='/request-password' component={ RequestPassword } />
        <Route path='/reset-password' component={ ResetPassword } />
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
