import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import oneReducer from '../reducers';
import App from './App';

const store = createStore(oneReducer);

const app = document.getElementById('app')
ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>, app);
