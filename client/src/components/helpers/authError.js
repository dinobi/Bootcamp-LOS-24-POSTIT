const authError = (error) => {
  if (error.response.data.error.message ===
    'Authentication failed. Invalid access token'
  ) {
    localStorage.clear();
    location.hash = '#login';
    return;
  }
  return 'notAuthError';
};

export default authError;
