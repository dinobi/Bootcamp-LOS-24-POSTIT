import authReducer from '../../reducers/authReducer';
import mockData from '../mocks/mockData';

let state = {
  userIsLoading: false,
  userIsAuthenticated: false,
  user: {}
}

describe('Authentication Reducers', () => {
  describe('When SIGNUP action type is fired', () => {
      it('should return the initial state', () => {
        expect(authReducer(state, {})).toEqual(state);
      })
      it('should trigger a user is loading state', () => {
        const action = {
          type: 'SIGNUP_REQUEST',
          newState: {
            userIsLoading: true,
            userIsAuthenticated: false,
            user: {}
          }
        };
        expect(authReducer(state, action)).toEqual(action.newState);
      });
      it('should trigger a signup success state and add a new user object', () => {
        const action = {
          type: 'SIGNUP_SUCCESS',
          user: mockData.staticUser[0],
          newState: {
            userIsLoading: false,
            userIsAuthenticated: true,
            user: mockData.staticUser[0]
          }
        };
        expect(authReducer(state, action)).toEqual(action.newState);
      });
      it('should trigger a signup failure state on failed attempt', () => {
        const action = {
          type: 'SIGNUP_FAILURE',
          newState: {
            userIsLoading: false,
            userIsAuthenticated: false,
            user: {}
          }
        };
        expect(authReducer(state, action)).toEqual(action.newState);
      });
    });
    describe('When LOGIN action type is fired', () => {
      it('should return the initial state', () => {
        expect(authReducer(state, {})).toEqual(state);
      })
      it('should trigger a user is loading state', () => {
        const action = {
          type: 'LOGIN_REQUEST',
          newState: {
            userIsLoading: true,
            userIsAuthenticated: false,
            user: {}
          }
        };
        expect(authReducer(state, action)).toEqual(action.newState);
      });
      it('should trigger a login success state and authenticate user', () => {
        const action = {
          type: 'LOGIN_SUCCESS',
          user: mockData.staticUser[0],
          newState: {
            userIsLoading: false,
            userIsAuthenticated: true,
            user: mockData.staticUser[0]
          }
        };
        expect(authReducer(state, action)).toEqual(action.newState);
      });
      it('should trigger a login failure state on failed attempt', () => {
        const action = {
          type: 'LOGIN_FAILURE',
          newState: {
            userIsLoading: false,
            userIsAuthenticated: false,
            user: {}
          }
        };
        expect(authReducer(state, action)).toEqual(action.newState);
      });
    });
    describe('When LOGOUT action type is fired', () => {
      it('should trigger a logout success state and un-authenticate', () => {
        const action = {
          type: 'LOGOUT',
          userData: mockData.emptyObject,
          message: 'You signed out successfully',
          newState: {
            userIsLoading: false,
            userIsAuthenticated: false,
            user: mockData.emptyObject
          }
        };
        expect(authReducer(state, action)).toEqual(action.newState);
      });
    });
})

