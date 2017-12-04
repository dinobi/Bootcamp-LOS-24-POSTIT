import sinon from 'sinon';
// import faker from 'faker';

export default {
  func: sinon.spy(),
  // dashboardUser: { groups: [] },
  promiseFuncResolve: sinon.spy(() => new Promise(() => {})),
  promiseFuncReject: sinon.spy(() => new Promise.reject()),
  emptyArray: [],
  emptyObject: {},
  emptyString: '   ', 
  match: { params: { id: 1 } },
  matchHash: { params: { id: 1, hash: '' } },
  messageObject: {
    fromUser: 'john_doe',
    toGroup: 'reactors',
    priority: 'urgent',
    message: 'Over before it begins'
  },
  string: [
    'troy', 'tray', 'fantasy',
    'learning', 'community',
    'testing purpose'
  ],
  longString: [
    'wakeMeUpWhenSeptemberEnds',
    'once upon a time in little china, a place we once called home',
    'thisIsOneVeryLongUsername',
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
    },
    {
      groupname: 'Yo',
      description: 'Yours trully'
    }
  ]
  
};

