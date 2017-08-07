import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'jquery'
import '../styles/base.css';
import './main';

const user = {
  firstName: 'Dinobi',
  lastName: 'Kenkwo',
  userName: 'dinobi45',
  email: 'dino.kennetcorp@gmail.com',
  phone: '08032952998',
  password: '123456',
  group: ['Family', 'ALC', 'Andela24', 'VMUG']
};

ReactDOM.render(<App userData = {user}/>, document.getElementById('root'));
