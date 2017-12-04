import jwtDecode from 'jwt-decode';

const checkAuthUser = (token) => {
  if (token === null) {
    return 'invalid';
  }
  if (token.trim() === '') {
    return 'invalid';
  }
  const decodeToken = jwtDecode(token);
  if (decodeToken.exp * 1000 < (new Date().getTime())) {
    const username = decodeToken.data.username;
    return ({ username, status: 'expired' });
  }
  return 'valid';
};

export default checkAuthUser;
