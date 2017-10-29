import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery';
import { Provider } from 'react-redux';
import 'materialize-css';
import store from '../store/configureStore';
import App from './App.jsx';
import '../styles/base.scss';

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, app);
