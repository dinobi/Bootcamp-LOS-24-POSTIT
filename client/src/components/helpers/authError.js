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
  return 'notAuthError';
};

export default authError;
