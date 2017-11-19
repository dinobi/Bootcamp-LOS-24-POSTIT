import sinon from 'sinon';
import faker from 'faker';

export default {
  func: sinon.spy(),
  // dashboardUser: { groups: [] },
  promiseFuncResolve: sinon.spy(() => Promise.resolve()),
  promiseFuncReject: sinon.spy(() => Promise.reject()),
  emptyArray: [],
  emptyObject: {},
  emptyString: '   ', 
  groupsArray: [{ groupname: faker.lorem.word(), description: faker.lorem.words() }],
  match: { params: { id: 1 } },
  matchHash: { params: { id: 1, hash: '' } },
  messageObject: { id: 1,
    fromUser: faker.lorem.word(),
    priority: faker.lorem.word(),
    message: faker.lorem.words() },
  string: faker.lorem.word(),
  longString: faker.lorem.sentences(),
  number: 1,
  buttonText: 'Okay',
  createGroupString: 'create-group',
  boolTrue: true,
  boolFalse: false,
  activeString: 'active',
  user: { message: [] },
  username: 'searchAgent',
  randomUser: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.phoneNumber(),
  },
  staticUser: [
    {
      username: 'john_doe',
      email: 'john_doe@postit.com',
      password: 'john_doe_dassword',
      phone: '08032952998'
    },
    {
      username: 'albert_einstein',
      email: 'a_einstein@postit.com',
      password: 's_ReLaTiViTy',
      phone: '08032952998'
    }
  ],
  staticGroups: [
    {
      groupname: 'reactors',
      description: 'react developers'
    },
    {
      groupname: 'lfc',
      description: 'liverpool football club'
    },
    {
      groupname: 'LFC',
      description: 'liverpool football club'
    }
  ]
  
};

