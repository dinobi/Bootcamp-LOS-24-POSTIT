// check if the user is authenticated//
// make sure pages other login,register are protected
/**
 * @return { jwtToken } jwtTokn
 */
export function getAccessToken() {
  return localStorage.getItem('userAuth');
}
/**
 * @return {boolean} boolean
 */
export function isLoggedIn() {
  // future check if token is expired//
  const authToken = getAccessToken();
  return !!authToken;
}
/**
 * @return {boolean} boolean
 */
export function requireAuth() {
  console.log('::::::OnEnter');
  // if (!isLoggedIn()) {
  //   location.hash = '#login';
  // }
}
