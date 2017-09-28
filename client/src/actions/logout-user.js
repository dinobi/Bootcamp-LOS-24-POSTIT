// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

/** */
export const onLogoutRequest = () => ({
  type: LOGOUT_REQUEST,
  isLoading: true,
  isAuthenticated: true
});
/** */
export const onLogoutSuccess = message => ({
  type: LOGOUT_SUCCESS,
  isLoading: false,
  isAuthenticated: false,
  message
});

const onLogoutUser = () =>
  (dispatch) => {
    dispatch(onLogoutRequest());
    localStorage.removeItem('userAuth');
    localStorage.removeItem('userAuth');
    localStorage.removeItem('reduxPersist:selectMember');
    localStorage.removeItem('reduxPersist:members');
    localStorage.removeItem('reduxPersist:messages');
    localStorage.removeItem('reduxPersist:toasts');
    localStorage.removeItem('reduxPersist:auth');
    localStorage.removeItem('reduxPersist:signup');                                                                                      m
    localStorage.removeItem('reduxPersist:groups');
    localStorage.removeItem('reduxPersist:newGroup');
    dispatch(onLogoutSuccess('You signed out successfully'));
    location.hash = '#login';
  };

export default onLogoutUser;

