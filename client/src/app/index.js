import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Landing, Register, Login, MySpace, Groups, Group, Search, AccountDetails } from '../components/layout'
import '../components/helpers/mobile-nav';
import '../styles/base.css';

const app = document.getElementById('app')
ReactDOM.render(
  <Router history = { hashHistory }>
      <Route exact path='/' component={ Landing }/>
      <Route path='/register' component={ Register }/>
      <Route path='/login' component={ Login }/>
      <Route path='/dashboard' component={ MySpace }/>
      <Route path='/groups' component={ Groups }/>
      <Route path='/groups/:group-name' component={ Group }/>
      <Route path='/search' component={ Search }/>
      <Route path='/account-details' component={ AccountDetails }/>
      
  </Router>
  , app);
