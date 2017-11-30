/* globals expect */
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import swal from 'sweetalert';
import * as types from '../../actionTypes';
import * as action from '../../actions';
import mockData from '../mocks/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);


describe('actions', () => {
  describe('Login action', () => {
    it('should create actions that authenticates a user',
      (done) => {
        const user = {
          username: 'foo',
          password: 'fooBar123'
        };
        mock.onPost('/api/user/signin', user)
          .reply(200, {
            data: {
              user
            }
          });
        const expectedActions = [
          { type: 'LOGIN_REQUEST' },
          { type: 'LOGIN_SUCCESS' }
        ];
        const store = mockStore();
        return store.dispatch(
          action.onLoginUser(user)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
    it('should create error action for failed request',
      (done) => {
        const user = {
          username: 'foo'
        };
        mock.onPost('/api/user/signin', user)
          .reply(400, {
            error: {
              message: 'Login Failed'
            }
          });
        const expectedActions = [
          { type: 'LOGIN_REQUEST' },
          { type: 'LOGIN_FAILURE' }
        ];
        const store = mockStore();
        return store.dispatch(
          action.onLoginUser(user)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  })

  describe('Signup Action', () => {
    it('should trigger actions that creates a new user',
      (done) => {
        const user = mockData.staticUser[0]
        mock.onPost('/api/user/signup', user)
          .reply(201, {
            message: 'Account successfully created',
            userData: user
          });
        const expectedActions = [
          { type: 'SIGNUP_REQUEST' },
          { type: 'SIGNUP_SUCCESS', user }
        ];
        const store = mockStore();
        return store.dispatch(
          action.onSignupUser(user)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
    it('should create error action for failed request',
      (done) => {
        const user = {
          username: 'foo',
          email: 'foo_bar@postit.com',
          password: '',
          phone: ''
        };
        mock.onPost('/api/user/signup', user)
          .reply(400, {
            error: {
              message: 'signup failed'
            }
          });
        const expectedActions = [
          { type: 'SIGNUP_REQUEST' },
          { type: 'SIGNUP_FAILURE' }
        ];
        const store = mockStore();
        return store.dispatch(
          action.onSignupUser(user)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  })

  describe('Add Member Action', () => {
    it('should trigger actions that adds user to a group',
      (done) => {
        const user = mockData.staticUser[0].username;
        const groupname = mockData.staticGroups[0].groupname;
        mock.onPost(`/api/groups/${groupname}/add-member`, user)
          .reply(200, {
            member: user,
            message: 'User successfully added',
            status: 201
          });
        const expectedActions = [
          { type: 'ADD_MEMBER_REQUEST' },
          { type: 'ADD_MEMBER_SUCCESS', member: user }
        ];
        const store = mockStore();
        return store.dispatch(
          action.onAddMember(user)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
    it('should create error action for failed request',
      (done) => {
        const user = {
          username: 'foo',
          email: 'foo_bar@postit.com',
          password: '',
          phone: ''
        };
        mock.onPost('/api/user/signup', user)
          .reply(400, {
            error: {
              message: 'signup failed'
            }
          });
        const expectedActions = [
          { type: 'SIGNUP_REQUEST' },
          { type: 'SIGNUP_FAILURE' }
        ];
        const store = mockStore();
        return store.dispatch(
          action.onSignupUser(user)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  })
});