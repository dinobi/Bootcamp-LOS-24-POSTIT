import jwtDecode from 'jwt-decode';

/*
* authUser
* verifies that a user has no token and
* also verifies if token has expired
*
* @returns {(boolean|object)}
*/
const authUser = () => {
  const token = localStorage.getItem('userAuth');
  if (token === null) {
    localStorage.clear();
    return false;
  }
  if (token.trim() === '') {
    localStorage.clear();
    return false;
  }
  const decodeToken = jwtDecode(token);
  const username = decodeToken.data.username;
  const email = decodeToken.data.email;
  if (decodeToken.exp * 1000 < (new Date().getTime())) {
    return ({ username, status: 'expired' });
  }
  return ({ username, email, userIsAuthenticated: true });
};

export default authUser;
