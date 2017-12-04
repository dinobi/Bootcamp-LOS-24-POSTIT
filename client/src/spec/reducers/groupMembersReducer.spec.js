import groupMembersReducer from '../../reducers/groupMembersReducer';
import mockData from '../mocks/mockData';

const state = {
  groupMembersIsLoading: false,
  addMemberIsLoading: false,
  removeMemberIsLoading: false,
  groupMembers: []
}

describe('Handling Group Members', () => {
  describe('When LOAD GROUP MEMBERS action type is fired', () => {
    it('should return the initial state without action', () => {
      expect(groupMembersReducer(state, {})).toEqual(state);
    })
    it('should trigger a loading group members state', () => {
      const action = {
        type: 'LOAD_GROUP_MEMBERS_REQUEST',
        groupMembersIsLoading: true,
        newState: {
          groupMembersIsLoading: true,
          addMemberIsLoading: false,
          removeMemberIsLoading: false,
          groupMembers: []
        }
      };
      expect(groupMembersReducer(state, action)).toEqual(action.newState);
    });
    it('should trigger a load members success state and an' +
      'array of group members',
      () => {
        const action = {
          type: 'LOAD_GROUP_MEMBERS_SUCCESS',
          groupMembersIsLoading: false,
          groupMembers: [mockData.staticUser[1]],
          newState: {
            groupMembersIsLoading: false,
            addMemberIsLoading: false,
            removeMemberIsLoading: false,
            groupMembers: [mockData.staticUser[1]]
          }
        };
        expect(groupMembersReducer(state, action)).toEqual(action.newState);
      });
    it('should trigger a load group messages failure state', () => {
      const action = {
        type: 'LOAD_GROUP_MEMBERS_FAILURE',
        groupMembersIsLoading: false,
        newState: {
          groupMembersIsLoading: false,
          addMemberIsLoading: false,
          removeMemberIsLoading: false,
          groupMembers: []
        }
      };
      expect(groupMembersReducer(state, action)).toEqual(action.newState);
    });
  });
  describe('When ADD GROUP MEMBER action type is fired', () => {
    it('should return the initial state without action', () => {
      expect(groupMembersReducer(state, {})).toEqual(state);
    })
    it('should trigger a add member is loading state', () => {
      const action = {
        type: 'ADD_MEMBER_REQUEST',
        addMemberIsLoading: true,
        newState: {
          groupMembersIsLoading: false,
          addMemberIsLoading: true,
          removeMemberIsLoading: false,
          groupMembers: []
        }
      };
      expect(groupMembersReducer(state, action)).toEqual(action.newState);
    });
    it('should trigger a add member success state and a' +
      'new member object',
      () => {
        const action = {
          type: 'ADD_MEMBER_SUCCESS',
          addMemberIsLoading: false,
          member: mockData.staticUser[1],
          newState: {
            groupMembersIsLoading: false,
            addMemberIsLoading: false,
            removeMemberIsLoading: false,
            groupMembers: [mockData.staticUser[1]]
          }
        };
        expect(groupMembersReducer(state, action)).toEqual(action.newState);
      });
    it('should trigger an add member failure state', () => {
      const action = {
        type: 'ADD_MEMBER_FAILURE',
        addMemberIsLoading: false,
        newState: {
          groupMembersIsLoading: false,
          addMemberIsLoading: false,
          removeMemberIsLoading: false,
          groupMembers: []
        }
      };
      expect(groupMembersReducer(state, action)).toEqual(action.newState);
    });
  });


  describe('When REMOVE MEMBER action type is fired', () => {
    it('should return the initial state without action', () => {
      expect(groupMembersReducer(state, {})).toEqual(state);
    })
    it('should trigger a remove member is loading state', () => {
      const action = {
        type: 'REMOVE_MEMBER_REQUEST',
        removeMemberIsLoading: true,
        newState: {
          groupMembersIsLoading: false,
          addMemberIsLoading: false,
          removeMemberIsLoading: true,
          groupMembers: []
        }
      };
      expect(groupMembersReducer(state, action)).toEqual(action.newState);
    });
    it('should trigger a add member success state and a' +
      'new member object',
      () => {
        const initialState = {
          groupMembersIsLoading: false,
          addMemberIsLoading: false,
          removeMemberIsLoading: false,
          groupMembers: [mockData.staticUser[0], mockData.staticUser[1]]
        }
        const action = {
          type: 'REMOVE_MEMBER_SUCCESS',
          removeMemberIsLoading: false,
          member: mockData.staticUser[1],
          newState: {
            groupMembersIsLoading: false,
            addMemberIsLoading: false,
            removeMemberIsLoading: false,
            groupMembers: [mockData.staticUser[0], mockData.staticUser[1]]
          }
        };
        expect(groupMembersReducer(initialState, action)).toEqual(action.newState);
      });
    it('should trigger a remove member failure state', () => {
      const action = {
        type: 'REMOVE_MEMBER_FAILURE',
        removeMemberIsLoading: false,
        newState: {
          groupMembersIsLoading: false,
          addMemberIsLoading: false,
          removeMemberIsLoading: false,
          groupMembers: []
        }
      };
      expect(groupMembersReducer(state, action)).toEqual(action.newState);
    });
  });
});

