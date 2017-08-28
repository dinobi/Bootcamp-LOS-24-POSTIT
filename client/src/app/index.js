import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../store/configure-store';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';
import App from './App';

const store = configureStore();
const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>, app);
