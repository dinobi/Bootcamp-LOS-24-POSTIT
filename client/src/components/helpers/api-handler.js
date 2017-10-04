import axios from 'axios';
// Create an abstraction for the api handler

const apiHandler = (url, body, method, headers) => {
  headers = new Headers();
  // headers['Content-Type'] = 'application/x-www-form-urlencoded';
  if (localStorage.getItem('userAuth') === null && location.hash !== '#register') {
    location.hash = '#login';
    return;
  }
  if (localStorage.getItem('userAuth') === null && location.hash !== '#login') {
    location.hash = '#register';
    return;
  }
  if (localStorage.getItem('userAuth') !== null) {
    headers['x-access-token'] = localStorage.getItem('userAuth');
  }
  if (body === null) {
    body = '';
  }
  if (method.toUpperCase() === 'GET') {
    return axios.get(url, { headers });
  }
  if (method.toUpperCase() === 'POST') {
    return axios({
      method: 'post',
      url,
      data: body,
      headers
    });
  }
};

export default apiHandler;
