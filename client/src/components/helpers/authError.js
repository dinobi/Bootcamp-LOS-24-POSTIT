/*
* authError
* verifies that a token is valid for
* request to the server
*
* @returns {(void|string)}
*/
const authError = (errorRes) => {
  if (errorRes.response.data.error.message ===
    'Authentication failed. Invalid access token'
  ) {
    localStorage.clear();
    location.hash = '#login';
    return;
  }
  if (errorRes.response.data.error.message ===
    'User not found. User has no PostIt account'
  ) {
    localStorage.clear();
    location.hash = '#login';
    return;
  }
  return 'notAuthError';
};

export default authError;
