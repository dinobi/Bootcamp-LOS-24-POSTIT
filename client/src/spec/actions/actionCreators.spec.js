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
  describe('Login and logout actions', () => {
    it('should create actions that authenticates a user',
      (done) => {
        const authToken = 'token';
        const user = {
          username: 'foo',
          password: 'fooBar123'
        };
        mock.onPost('/api/user/signin', user)
          .reply(200, {
            data: {
              message: 'authentication successful',
              userData: user,
              authToken
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
        const authToken = 'token';
        const user = mockData.staticUser[0]
        mock.onPost('/api/user/signup', user)
          .reply(201, {
            message: 'Account successfully created',
            userData: user,
            authToken
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

  describe('Add and Remove Member Actions', () => {
    it('should trigger actions that adds user to a group',
      (done) => {
        const user = mockData.staticUser[0].username;
        const groupname = mockData.staticGroups[0].groupname;
        mock.onPost(`/api/groups/${groupname}/add-member`, user)
          .reply(201, {
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
          action.onAddMember(user, groupname)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
    it('should create an error action for failed request to add member',
      (done) => {
        const user = mockData.staticUser[0].username;
        const groupname = '';
        mock.onPost(`/api/groups/${groupname}/add-member`, user)
          .reply(400, {
            error: {
              message: 'Bad request'
            }
          });
        const expectedActions = [
          { type: 'ADD_MEMBER_REQUEST' },
          { type: 'ADD_MEMBER_FAILURE' }
        ];
        const store = mockStore();
        return store.dispatch(
          action.onAddMember(user, groupname)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
    it('should trigger actions that removes a user from group',
      (done) => {
        const user = mockData.staticUser[0].username;
        const groupname = mockData.staticGroups[0].groupname;
        mock.onPost(`/api/groups/${groupname}/add-member`, user)
          .reply(201, {
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
          action.onAddMember(user, groupname)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  })
  describe('Group Action', () => {
    it('should trigger actions that creates a new group',
      (done) => {
        const groupData = mockData.staticGroups[0]
        mock.onPost('/api/create-group', groupData)
          .reply(201, {
            groupData: mockData.staticGroups[0],
            message: 'Group was successfully created'
          });
        const expectedActions = [
          { type: 'CREATE_GROUP_REQUEST' },
          { type: 'CREATE_GROUP_SUCCESS', group: groupData }
        ];
        const store = mockStore();
        return store.dispatch(
          action.onCreateGroup(groupData)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
    it('should create error action for failed create group request',
      (done) => {
        const groupData = mockData.staticGroups[0].groupname
        mock.onPost('/api/create-group', groupData)
          .reply(400, {
            error: {
              message: 'Group creation failed'
            }
          });
        const expectedActions = [
          { type: 'CREATE_GROUP_REQUEST' },
          { type: 'CREATE_GROUP_FAILURE' }
        ];
        const store = mockStore();
        return store.dispatch(
          action.onCreateGroup(groupData)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
    it('should trigger actions that archives a group',
      (done) => {
        const groupData = mockData.staticGroups[0].groupname
        mock.onPost('/api/groups/delete-group', groupData)
          .reply(200, {
            group: groupData,
            message: 'group was successfully archived'
          });
        const expectedActions = [
          { type: 'DELETE_GROUP_REQUEST' },
          { type: 'DELETE_GROUP_SUCCESS', group: groupData }
        ];
        const store = mockStore();
        return store.dispatch(
          action.onArchiveGroup(groupData)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
    it('should create error action for failed request',
      (done) => {
        const groupData = '';
        mock.onPost('/api/groups/delete-group', groupData)
          .reply(400, {
            error: {
              message: 'Group does not exist'
            }
          });
        const expectedActions = [
          { type: 'DELETE_GROUP_REQUEST' },
          { type: 'DELETE_GROUP_FAILURE' }
        ];
        const store = mockStore();
        return store.dispatch(
          action.onArchiveGroup(groupData)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
    it('should trigger actions that gets a users groups',
      (done) => {
        mock.onGet(`/api/groups/me`)
          .reply(200, {
            groups: []
          });
        const expectedActions = [
          { type: 'LOAD_GROUPS_REQUEST' },
          {
            type: 'LOAD_GROUPS_SUCCESS',
            groups: {
              groups: []
            }
          }
        ];
        const store = mockStore();
        return store.dispatch(
          action.onLoadGroups()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
    it('should create an error action for failed members request',
      (done) => {
        const groupname = '';
        mock.onGet(`/api/groups/${groupname}/members`)
          .reply(400, {
            error: {
              message: 'Bad request'
            }
          });
        const expectedActions = [
          { type: 'LOAD_GROUP_MEMBERS_REQUEST' },
          { type: 'LOAD_GROUP_MEMBERS_FAILURE' }
        ];
        const store = mockStore();
        return store.dispatch(
          action.loadGroupMembers(groupname)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
    it('should trigger actions that gets group messages',
      (done) => {
        const groupname = mockData.staticGroups[0].groupname
        mock.onGet(`/api/groups/${groupname}/show-messages`)
          .reply(200, {
            groupMessages: []
          });
        const expectedActions = [
          { type: 'LOAD_GROUP_MESSAGES_REQUEST' },
          {
            type: 'LOAD_GROUP_MESSAGES_SUCCESS',
            groupMessages: {
              groupMessages: []
            }
          }
        ];
        const store = mockStore();
        return store.dispatch(
          action.loadGroupMessages(groupname)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
    it('should create an error actions for failed group messages request',
      (done) => {
        const groupname = ''
        mock.onGet(`/api/groups/${groupname}/show-messages`)
          .reply(400, {
            error: {
              message: 'Bad request'
            }
          });
        const expectedActions = [
          { type: 'LOAD_GROUP_MESSAGES_REQUEST' },
          { type: 'LOAD_GROUP_MESSAGES_FAILURE' }
        ];
        const store = mockStore();
        return store.dispatch(
          action.loadGroupMessages(groupname)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  });
  describe('New Password Action', () => {
    it('should trigger actions that requests for a new password',
      (done) => {
        const email = mockData.staticUser[0].email
        mock.onPost('/api/user/request-password')
          .reply(200, {
            message: 'password request was successful'

          });
        const expectedActions = [
          { type: 'REQUEST_PASSWORD' },
          { type: 'REQUEST_PASSWORD_SUCCESS' }
        ];
        const store = mockStore();
        return store.dispatch(
          action.onRequestPassword(email)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
    // it('should create an error action for failed password request',
    // (done) => {
    //   const email = ''
    //   mock.onPost('/api/user/request-password')
    //     .reply(400, {
    //       error: {
    //         message: 'Request password was unsuccessful'
    //       }
    //     });
    //   const expectedActions = [
    //     { type: 'REQUEST_PASSWORD' },
    //     { type: 'REQUEST_PASSWORD_FAILURE' }
    //   ];
    //   const store = mockStore();
    //   return store.dispatch(
    //     action.onRequestPassword(email)).then(() => {
    //       expect(store.getActions()).toEqual(expectedActions);
    //       done();
    //     });
    // });
    it('should trigger actions that resets a users password',
      (done) => {
        const password = mockData.staticUser[0].password;
        const hash = 'reset_secret';
        mock.onPost(`/api/user/reset-password/${hash}`, password)
          .reply(200, {
            message: 'password reset was successful'

          });
        const expectedActions = [
          { type: 'RESET_PASSWORD' },
          { type: 'RESET_PASSWORD_SUCCESS' }
        ];
        const store = mockStore();
        return store.dispatch(
          action.onResetPassword(password, hash)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
    it('should create an error action for failed reset',
      (done) => {
        const password = '';
        const hash = '';
        mock.onPost(`/api/user/reset-password/${hash}`, password)
          .reply(400, {
            error: {
              message: 'password reset was successful'
            }
          });
        const expectedActions = [
          { type: 'RESET_PASSWORD' },
          { type: 'RESET_PASSWORD_FAILURE' }
        ];
        const store = mockStore();
        return store.dispatch(
          action.onResetPassword(password, hash)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  });
  describe('Message Action', () => {
    it('should trigger actions to send message to group',
    (done) => {
      const groupname = mockData.staticGroups[0].groupname;
      const message = mockData.messageObject;
      mock.onPost(`/api/groups/${groupname}/send-message`, message)
        .reply(201, {
          message
        });
      const expectedActions = [
        { type: 'SEND_MESSAGE_REQUEST' },
        { type: 'SEND_MESSAGE_SUCCESS',
          message: {message}
        }
      ];
      const store = mockStore();
      return store.dispatch(
        action.onSendMessage(message, groupname)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
    it('should create an error action for failed message',
    (done) => {
      const groupname = mockData.staticGroups[0].groupname;
      const message = '';
      mock.onPost(`/api/groups/${groupname}/send-message`, message)
        .reply(400, {
          error: {
            message: 'Bad request. No message content'
          }
        });
      const expectedActions = [
        { type: 'SEND_MESSAGE_REQUEST' },
        { type: 'SEND_MESSAGE_FAILURE' }
      ];
      const store = mockStore();
      return store.dispatch(
        action.onSendMessage(message, groupname)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  })
});