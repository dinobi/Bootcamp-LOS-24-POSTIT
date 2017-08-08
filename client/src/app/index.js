import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Landing, Register, Login, MySpace, Groups, Group, Search, AccountDetails } from '../components/layout'
import '../components/helpers/mobile-nav';
import '../styles/base.css';

const app = document.getElementById('app')
ReactDOM.render(<App/>, app);
