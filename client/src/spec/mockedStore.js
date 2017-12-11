const mockedStore = {
  members: {
    groupMembersIsLoading: false,
    addMemberIsLoading: false,
    removeMemberIsLoading: false,
    groupMembers: [
      {
        id: 2,
        username: 'nebanat',
        email: 'nebanat@postit.com',
        createdAt: '2017-11-22T18:30:20.746Z',
        UserGroup: {
          username: 'nebanat',
          groupname: 'rainier team',
          createdAt: '2017-11-23T22:35:25.576Z',
          updatedAt: '2017-11-23T22:35:25.576Z'
        }
      }
    ]
  },
  messages: {
    groupMessagesIsLoading: false,
    sendMessageIsLoading: false,
    groupMessages: [
      {
        id: 5,
        message: 'hey guys',
        fromUser: 'enodi',
        toGroup: 'rainier team',
        priority: 'normal',
        createdAt: '2017-11-23T22:37:11.129Z'
      }
    ]
  },
  auth: {
    userIsLoading: false,
    userIsAuthenticated: false,
    user: {}
  },
  groups: {
    groupsIsLoading: false,
    createGroupIsLoading: false,
    deleteGroupIsLoading: false,
    groups: [
      {
        id: 1,
        groupname: 'rainier team',
        description: 'Simulations Team',
        UserGroup: {
          username: 'dinobi',
          groupname: 'rainier team',
          createdAt: '2017-11-23T22:35:05.045Z',
          updatedAt: '2017-11-23T22:35:05.045Z'
        }
      }
    ]
  },
  changePassword: {
    passwordRequestIsLoading: false,
    passwordResetIsLoading: false
  }
}

export default mockedStore;