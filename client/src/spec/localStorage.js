import jwt from 'jsonwebtoken';

module.exports = {
  setLocalStorage: function () {
    const data = { username: 'john_doe', email: 'john_doe@postit.com' }
    const token = jwt.sign({ data, exp: Math.floor(Date.now() / 1000) + 3000 }, 'secret');
    localStorage.setItem('userAuth', token);
  },
  setExpiredToken: function () {
    const data = { username: 'john_doe', email: 'john_doe@postit.com' }
    const token = jwt.sign({ data, exp: Math.floor(Date.now() / 1000) + -1 }, 'secret');
    localStorage.setItem('userAuth', token);
  },
  clearLocalStorage: function () {
    localStorage.setItem('userAuth', '')
  }
};