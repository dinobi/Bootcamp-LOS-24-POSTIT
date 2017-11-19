import sinon from 'sinon';
// import faker from 'faker';

export default {
  func: sinon.spy(),
  // dashboardUser: { groups: [] },
  promiseFuncResolve: sinon.spy(() => Promise.resolve()),
  promiseFuncReject: sinon.spy(() => Promise.reject()),
  emptyArray: [],
  emptyObject: {},
  emptyString: '   ', 
  match: { params: { id: 1 } },
  matchHash: { params: { id: 1, hash: '' } },
  // messageObject: { id: 1,
  //   fromUser: faker.lorem.word(),
  //   priority: faker.lorem.word(),
  //   message: faker.lorem.words() },
  string: [
    'troy', 'tray', 'fantasy',
    'learning', 'community',
    'testing purpose'
  ],
  longString: [
    'wake me up when september ends',
    'once upon a time in little china, a place we once called home'
  ],
  number: 1,
  buttonText: 'Okay',
  createGroupString: 'create-group',
  boolTrue: true,
  boolFalse: false,
  activeString: 'active',
  user: { message: [] },
  username: 'searchAgent',
  email: 'searchAgent@postit.com',
  // randomUser: {
  //   username: faker.internet.userName(),
  //   email: faker.internet.email(),
  //   password: faker.internet.password(),
  //   phone: faker.phone.phoneNumber(),
  // },
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
    },
    {
      username: 'isaac',
      email: 'issac@postit.com',
      password: 'boomerang',
      phone: '08032952998'
    },
    {
      username: 'invalid_guy',
      email: 'issac@postit',
      password: 'wthit',
      phone: '08032952998'
    },
    {
      username: 'invalid_guy2',
      email: 'tsunamu@postit.com',
      password: 'hellYa',
      phone: '08032952998abc'
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
    },
    {
      groupname: 'fictitio',
      description: 'liverpool football club'
    }
  ]
  
};

