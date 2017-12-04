import groupsReducer from '../../reducers/groupsReducer';
import mockData from '../mocks/mockData';

const state = {
  groupsIsLoading: false,
  createGroupIsLoading: false,
  deleteGroupIsLoading: false,
  groups: []
}

describe('Handling Groups', () => {
  describe('When LOAD GROUPS action type is fired', () => {
    it('should return the initial state', () => {
      expect(groupsReducer(state, {})).toEqual(state);
    })
    it('should trigger a groups is loading state', () => {
      const action = {
        type: 'LOAD_GROUPS_REQUEST',
        newState: {
          groupsIsLoading: true,
          createGroupIsLoading: false,
          deleteGroupIsLoading: false,
          groups: []
        }
      };
      expect(groupsReducer(state, action)).toEqual(action.newState);
    });
    it('should trigger a load groups success state and add a new group array',
    () => {
      const action = {
        type: 'LOAD_GROUPS_SUCCESS',
        groupsIsLoading: false,
        groups: [mockData.staticGroups[0]],
        newState: {
          groupsIsLoading: false,
          createGroupIsLoading: false,
          deleteGroupIsLoading: false,
          groups: [mockData.staticGroups[0]]
        }
      };
      expect(groupsReducer(state, action)).toEqual(action.newState);
    });
    it('should trigger a load groups failure state', () => {
      const action = {
        type: 'LOAD_GROUPS_FAILURE',
        groupsIsLoading: false,
        message: 'error loading groups',
        newState: {
          groupsIsLoading: false,
          createGroupIsLoading: false,
          deleteGroupIsLoading: false,
          groups: []
        }
      };
      expect(groupsReducer(state, action)).toEqual(action.newState);
    });
  });
  describe('When CREATE GROUP action type is fired', () => {
    it('should return the initial state', () => {
      expect(groupsReducer(state, {})).toEqual(state);
    })
    it('should trigger a create group is loading state', () => {
      const action = {
        type: 'CREATE_GROUP_REQUEST',
        createGroupIsLoading: true,
        newState: {
          groupsIsLoading: false,
          createGroupIsLoading: true,
          deleteGroupIsLoading: false,
          groups: []
        }
      };
      expect(groupsReducer(state, action)).toEqual(action.newState);
    });
    it('should trigger a create group success state and add a group object',
      () => {
        const action = {
          type: 'CREATE_GROUP_SUCCESS',
          user: mockData.staticUser[0],
          createGroupsIsLoading: false,
          group: mockData.staticGroups[0],
          newState: {
            groupsIsLoading: false,
            createGroupIsLoading: false,
            deleteGroupIsLoading: false,
            groups: [mockData.staticGroups[0]]
          }
        };
        expect(groupsReducer(state, action)).toEqual(action.newState);
      });
    it('should trigger a create group failure state', () => {
      const action = {
        type: 'CREATE_GROUP_FAILURE',
        createGroupIsLoading: false,
        newState: {
          groupsIsLoading: false,
          createGroupIsLoading: false,
          deleteGroupIsLoading: false,
          groups: []
        }
      };
      expect(groupsReducer(state, action)).toEqual(action.newState);
    });
  });
  describe('When DELETE GROUP action type is fired', () => {
    it('should return the initial state', () => {
      expect(groupsReducer(state, {})).toEqual(state);
    })
    it('should trigger a delete group is loading state', () => {
      const action = {
        type: 'DELETE_GROUP_REQUEST',
        deleteGroupIsLoading: true,
        newState: {
          groupsIsLoading: false,
          createGroupIsLoading: false,
          deleteGroupIsLoading: true,
          groups: []
        }
      };
      expect(groupsReducer(state, action)).toEqual(action.newState);
    });
    it('should trigger a success state and remove the specified group',
      () => {
        const initialState = {
          groupsIsLoading: false,
          createGroupIsLoading: false,
          deleteGroupIsLoading: true,
          groups: [mockData.staticGroups[0]]
        }
        const action = {
          type: 'DELETE_GROUP_SUCCESS',
          group: mockData.staticGroups[0],
          newState: {
            groupsIsLoading: false,
            createGroupIsLoading: false,
            deleteGroupIsLoading: false,
            groups: []
          }
        };
        expect(groupsReducer(initialState, action)).toEqual(action.newState);
      });
    it('should trigger a delete group failure state', () => {
      const action = {
        type: 'DELETE_GROUP_FAILURE',
        deleteGroupIsLoading: false,
        newState: {
          groupsIsLoading: false,
          createGroupIsLoading: false,
          deleteGroupIsLoading: false,
          groups: []
        }
      };
      expect(groupsReducer(state, action)).toEqual(action.newState);
    });
  });
  
})

