import axios from 'axios';
// Create an abstraction for the api handler

const apiHandler = (url, body, method) => {
  const token = localStorage.getItem('userAuth');
  if (token === null && location.hash !== '#register') {
    location.hash = '#login';
    return;
  }
  if (token === null && location.hash !== '#login') {
    location.hash = '#register';
    return;
  }
  if (token !== null) {
    axios.defaults.headers.common['x-access-token'] = `${token}`;
  }
  if (body === null) {
    body = '';
  }
  if (method.toUpperCase() === 'GET') {
    return axios.get(url);
  }
  if (method.toUpperCase() === 'POST') {
    return axios({
      method: 'post',
      url,
      data: body
    });
  }
};

export default apiHandler;
