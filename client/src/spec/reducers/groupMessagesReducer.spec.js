import groupMessagesReducer from '../../reducers/groupMessagesReducer';
import mockData from '../mocks/mockData';

const state = {
  groupMessagesIsLoading: false,
  sendMessageIsLoading: false,
  groupMessages: []
}

describe('Group Messages', () => {
  describe('When SEND MESSAGES action type is fired', () => {
    it('should return the initial state without action', () => {
      expect(groupMessagesReducer(state, {})).toEqual(state);
    })
    it('should trigger a send message is loading state', () => {
      const action = {
        type: 'SEND_MESSAGE_REQUEST',
        sendMessageIsLoading: true,
        newState: {
          groupMessagesIsLoading: false,
          sendMessageIsLoading: true,
          groupMessages: []
        }
      };
      expect(groupMessagesReducer(state, action)).toEqual(action.newState);
    });
    it('should trigger a send message success state with new message object',
      () => {
        const action = {
          type: 'SEND_MESSAGE_SUCCESS',
          sendMessageIsLoading: false,
          message: mockData.messageObject,
          newState: {
            groupMessagesIsLoading: false,
            sendMessageIsLoading: false,
            groupMessages: [mockData.messageObject]
          }
        };
        expect(groupMessagesReducer(state, action)).toEqual(action.newState);
      });
    it('should trigger a send message failure state', () => {
      const action = {
        type: 'SEND_MESSAGE_FAILURE',
        sendMessageIsLoading: false,
        newState: {
          groupMessagesIsLoading: false,
          sendMessageIsLoading: false,
          groupMessages: []
        }
      };
      expect(groupMessagesReducer(state, action)).toEqual(action.newState);
    });
  });
  describe('When LOAD GROUP MESSAGE action type is fired', () => {
    it('should return the initial state without action', () => {
      expect(groupMessagesReducer(state, {})).toEqual(state);
    })
    it('should trigger a loading group message state', () => {
      const action = {
        type: 'LOAD_GROUP_MESSAGES_REQUEST',
        groupMessagesIsLoading: true,
        newState: {
          groupMessagesIsLoading: true,
          sendMessageIsLoading: false,
          groupMessages: []
        }
      };
      expect(groupMessagesReducer(state, action)).toEqual(action.newState);
    });
    it('should trigger a load group success state and an' +
      'array of group maeesages',
      () => {
        const action = {
          type: 'LOAD_GROUP_MESSAGES_SUCCESS',
          groupMessagesIsLoading: false,
          groupMessages: [mockData.messageObject],
          newState: {
            groupMessagesIsLoading: false,
            sendMessageIsLoading: false,
            groupMessages: [mockData.messageObject]
          }
        };
        expect(groupMessagesReducer(state, action)).toEqual(action.newState);
      });
    it('should trigger a load group messages failure state', () => {
      const action = {
        type: 'LOAD_GROUP_MESSAGES_FAILURE',
        groupMessagesIsLoading: false,
        newState: {
          groupMessagesIsLoading: false,
          sendMessageIsLoading: false,
          groupMessages: []
        }
      };
      expect(groupMessagesReducer(state, action)).toEqual(action.newState);
    });
  });
});

