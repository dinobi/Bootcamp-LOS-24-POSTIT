// import groupMembersReducer from '../../reducers/groupMembersReducer';
// import groupMessagesReducer from '../../reducers/groupMessagesReducer';
import passwordReducer from '../../reducers/passwordReducer';
import mockData from '../mocks/mockData';

const state = {
  passwordRequestIsLoading: false,
  passwordResetIsLoading: false
}

describe('Password Reducers', () => {
  describe('When NEW PASSWORD REQUEST action type is fired', () => {
      // it('should return the initial state', () => {
      //   const action = {}
      //   expect(passwordReducer(state, action)).toEqual(state);
      // })
      it('should trigger a password request is loading state', () => {
        const action = {
          type: 'REQUEST_PASSWORD',
          user: mockData.staticUser[0].email,
          newState: {
            passwordRequestIsLoading: true,
            passwordResetIsLoading: false
          }
        };
        expect(passwordReducer(state, action)).toEqual(action.newState);
      });
      it('should trigger a password request success state', () => {
        const action = {
          type: 'REQUEST_PASSWORD_SUCCESS',
          message: 'password request was successful',
          newState: {
            passwordRequestIsLoading: false,
            passwordResetIsLoading: false
          }
        };
        expect(passwordReducer(state, action)).toEqual(action.newState);
      });
      it('should trigger a password request failure state', () => {
        const action = {
          type: 'REQUEST_PASSWORD_SUCCESS',
          message: 'password request failed',
          newState: {
            passwordRequestIsLoading: false,
            passwordResetIsLoading: false
          }
        };
        expect(passwordReducer(state, action)).toEqual(action.newState);
      });
    });
    describe('When RESET PASSWORD action type is fired', () => {
      // it('should return the initial state', () => {
      //   const action = {}
      //   expect(passwordReducer(state, action)).toEqual(state);
      // })
      // it('should trigger a password reset is loading state', () => {
      //   const action = {
      //     type: 'RESET_PASSWORD_REQUEST',
      //     user: mockData.longString[0],
      //     newState: {
      //       passwordRequestIsLoading: false,
      //       passwordResetIsLoading: true
      //     }
      //   };
      //   expect(passwordReducer(state, action)).toEqual(action.newState);
      // });
      it('should trigger a password reset success state', () => {
        const action = {
          type: 'RESET_PASSWORD_SUCCESS',
          message: 'reset was successful',
          newState: {
            passwordRequestIsLoading: false,
            passwordResetIsLoading: false
          }
        };
        expect(passwordReducer(state, action)).toEqual(action.newState);
      });
      it('should trigger a password reset failure state', () => {
        const action = {
          type: 'RESET_PASSWORD_FAILURE',
          message: 'password reset attempt failed',
          newState: {
            passwordRequestIsLoading: false,
            passwordResetIsLoading: false
          }
        };
        expect(passwordReducer(state, action)).toEqual(action.newState);
      });
    });
})

