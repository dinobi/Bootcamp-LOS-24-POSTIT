import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import '../components/helpers/mobile-nav';
import '../styles/base.css';

const app = document.getElementById('app')
ReactDOM.render(
  <Router history = { hashHistory }>
  </Router>
  , app);
