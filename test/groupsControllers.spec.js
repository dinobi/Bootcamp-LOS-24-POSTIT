import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../server/app';
import models from '../server/models';
import mockData from '../client/src/spec/mocks/mockData';

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
let token;
let token2;

describe('groupsControllersTest ', () => {
  before((done) => {
    chai.request(app)
    .post('/api/user/signup/')
    .type('form')
    .send(mockData.staticUser[1])
    .end((err, res) => {
      res.should.have.status(201);
      token = res.body.authToken;
      chai.request(app)
      .post('/api/user/signin/')
      .type('form')
      .send({
        username: mockData.staticUser[0].username,
        password: mockData.staticUser[0].password
      })
      .end((err, res) => {
        res.should.have.status(200);
        token2 = res.body.authToken;
        done();
      });
    });
  });

  describe('When a user hits the route POST /api/create-group/', (done) => {
    it('responds with status 401 if token is not supplied', (done) => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', '')
      .type('form')
      .send(mockData.staticGroups[1])
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });
    it('responds with status 400 if groupname is omitted', (done) => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        description: mockData.staticGroups[1].description
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
    it('responds with status 400 if groupname is not provided', (done) => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: '   ',
        description: mockData.staticGroups[1].description
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
    it('responds with status 400 if groupname is not valid', (done) => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: 'foo000@bar',
        description: mockData.staticGroups[0].description
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.error.message).to.eql
        ('groupname can contain only alphabets, numbers, dash and underscore');
        done();
      });
    });
    it('responds with status 400 if description is omitted', (done) => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.staticGroups[1].groupname
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
    it('responds with status 400 if description is not provided', (done) => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.staticGroups[1].groupname,
        description: '  '
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
    it('responds with status 400 if groupname is less than 3 characters', (done) => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.staticGroups[4].groupname,
        description: mockData.staticGroups[0].description
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.error.message).to.equal
        ('group name is too short. minimum of 3 characters is allowed');
        done();
      });
    });
    it('responds with status 413 if groupname is more than 15 characters', (done) => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.longString[0],
        description: mockData.staticGroups[0].description
      })
      .end((err, res) => {
        res.should.have.status(413);
        expect(res.body.error.message).to.equal
        ('group name is too long. max of 15 characters is allowed');
      });
    });
    it('responds with status 400 if description is less than 15 characters', (done) => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.staticGroups[1].groupname,
        description: mockData.staticGroups[4].description
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.error.message).to.equal
        ('description is too short. minimum of 15 characters is allowed');
        done();
      });
    });
    it('responds with status 413 if description is more than 45 characters', (done) => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.staticGroups[1].groupname,
        description: mockData.longString[1]
      })
      .end((err, res) => {
        res.should.have.status(413);
        expect(res.body.error.message).to.equal
        ('description is too long. max of 45 characters is allowed');
        done();
      });
    });
    it('responds with status 201 and creates a new group if supplied correct parameters', (done) => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send(mockData.staticGroups[1])
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
    });
    it('adds group creator to group on successful group creation', (done) => {
      //fetch my groups
      chai.request(app)
      .get(`/api/groups/me`)
      .set('x-access-token', token)
      .end((error, res) => {
        res.should.have.status(200);
        done();
      });
    });
    it('is case insensitive and responds with status 409 for similar groupnames', (done) => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send(mockData.staticGroups[1])
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
    });
  });
  describe('When a user hit the route POST /api/groups/:groupname/add-member/', () => {
    it('responds with status 400 if username is not supplied', (done) => {
      chai.request(app)
      .post(`/api/groups/${mockData.staticGroups[1].groupname}/add-member/`)
      .type('form')
      .set('x-access-token', token)
      .send({
        username: mockData.emptyString
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.error.message).to.eql('Bad request, username is required');
        done();
      });
    });
    it('responds with status 404 if username does not exist', (done) => {
      chai.request(app)
      .post(`/api/groups/${mockData.staticGroups[1].groupname}/add-member/`)
      .type('form')
      .set('x-access-token', token)
      .send({
        username: mockData.staticUser[3].username
      })
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.error.message).to.eql('User not found. User has no PostIt account');
        done();
      });
    });
    it('responds with status 400 if groupname is not supplied', (done) => {
      chai.request(app)
      .post(`/api/groups/${mockData.emptyString}/add-member/`)
      .type('form')
      .set('x-access-token', token)
      .send({
        username: mockData.staticUser[0].username
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.error.message).to.eql('Bad request, groupname is required');
        done();
      });
    });
    it('responds with status 404 if groupname does not exist', (done) => {
      const groupname = mockData.staticGroups[3].groupname;
      chai.request(app)
      .post(`/api/groups/${groupname}/add-member/`)
      .type('form')
      .set('x-access-token', token)
      .send({
        username: mockData.staticUser[0].username
      })
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.error.message).to.eql(`${groupname} does not exist on PostIt`);
        done();
      });
    });
    it('responds with status 201 and adds a user to the group', (done) => {
      chai.request(app)
      .post(`/api/groups/${mockData.staticGroups[1].groupname}/add-member/`)
      .type('form')
      .set('x-access-token', token)
      .send({
        username: mockData.staticUser[0].username
      })
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.message).to.eql('john_doe was added to lfc');
        done();
      });
    });
    it('responds with status 409 if user has already been added to group', (done) => {
      const { groupname } = mockData.staticGroups[1];
      chai.request(app)
      .post(`/api/groups/${groupname}/add-member/`)
      .type('form')
      .set('x-access-token', token)
      .send({
        username: mockData.staticUser[0].username
      })
      .end((err, res) => {
        res.should.have.status(409);
        expect(res.body.error.message).to.eql('User already belong to group');
        done();
      });
    });
  });

  describe('When a user hit the route POST /api/groups/:groupname/remove-member/', () => {
    it('responds with status 400 if username is not supplied', (done) => {
      chai.request(app)
      .post(`/api/groups/${mockData.staticGroups[1].groupname}/remove-member/`)
      .type('form')
      .set('x-access-token', token)
      .send({
        username: mockData.emptyString
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.error.message).to.eql('Bad request, username is required');
        done();
      });
    });
    it('responds with status 404 if username does not exist', (done) => {
      chai.request(app)
      .post(`/api/groups/${mockData.staticGroups[1].groupname}/remove-member/`)
      .type('form')
      .set('x-access-token', token)
      .send({
        username: mockData.staticUser[3].username
      })
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.error.message).to.eql('User not found. User has no PostIt account');
        done();
      });
    });
    it('responds with status 400 if groupname is not supplied', (done) => {
      chai.request(app)
      .post(`/api/groups/${mockData.emptyString}/remove-member/`)
      .type('form')
      .set('x-access-token', token)
      .send({
        username: mockData.staticUser[0].username
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.error.message).to.eql('Bad request, groupname is required');
        done();
      });
    });
    it('responds with status 404 if groupname does not exist', (done) => {
      const groupname = mockData.staticGroups[3].groupname
      chai.request(app)
      .post(`/api/groups/${groupname}/remove-member/`)
      .type('form')
      .set('x-access-token', token)
      .send({
        username: mockData.staticUser[0].username
      })
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.error.message).to.eql(`${groupname} does not exist on PostIt`);
        done();
      });
    });
    it('successfully removes a member and responds with status 200', (done) => {
      const { groupname } = mockData.staticGroups[1];
      const { username } = mockData.staticUser[0];
      chai.request(app)
      .post(`/api/groups/${groupname}/remove-member/`)
      .type('form')
      .set('x-access-token', token)
      .send({ username })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.eql
        (`${username} was successfully removed from ${groupname}`);
        done();
      });
    });
    it('responds with status 404 if user is not in group', (done) => {
      const { groupname } = mockData.staticGroups[1];
      chai.request(app)
      .post(`/api/groups/${groupname}/remove-member/`)
      .type('form')
      .set('x-access-token', token)
      .send({
        username: mockData.staticUser[0].username
      })
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.error.message).to.eql(`No such user in ${groupname}`);
        done();
      });
    });   
  });
  describe('When a user hit the route POST /api/groups/:groupname/members/', () => {
    it('responds with status 400 if group is not specified', (done) => {
      chai.request(app)
      .get(`/api/groups/${mockData.emptyString}/members`)
      .set('x-access-token', token)
      .end((error, res) => {
        res.should.have.status(400);
        res.body.error.message.should.equal(
          'Bad request, groupname is required'
        )
        done();
      });
    });
    it('responds with status 404 if group does not exist', (done) => {
      const { groupname } = mockData.staticGroups[3];
      chai.request(app)
      .get(`/api/groups/${groupname}/members`)
      .set('x-access-token', token)
      .end((error, res) => {
        res.should.have.status(404);
        res.body.error.message.should.equal(
          `${groupname} does not exist on PostIt`
        )
        done();
      });
    });
    it('responds with status 200 if group exist',
    (done) => {
      chai.request(app)
      .get(`/api/groups/${mockData.staticGroups[1].groupname}/members`)
      .set('x-access-token', token)
      .end((error, res) => {
        res.should.have.status(200);
        done();
      });
    });
    it('responds with status 200 if user belongs to group',
    (done) => {
      chai.request(app)
      .get(`/api/groups/${mockData.staticGroups[1].groupname}/members`)
      .set('x-access-token', token)
      .end((error, res) => {
        res.should.have.status(200);
        done();
      });
    });
    it('responds with status 401 if user does not belong to group',
    (done) => {
      chai.request(app)
      .get(`/api/groups/${mockData.staticGroups[1].groupname}/members`)
      .set('x-access-token', token2)
      .end((error, res) => {
        res.should.have.status(401);
        done();
      });
    });
  });
  describe('When a user hits the route POST /api/groups/delete-group/', () => {
    it('responds with status 401 if token is not supplied', (done) => {
      chai.request(app)
      .post('/api/groups/delete-group')
      .set('x-access-token', '')
      .type('form')
      .send({
        groupname: mockData.staticGroups[1].groupname
      })
      .end((err, res) => {
        res.should.have.status(401);
        done()
      });
    });
    it('responds with status 400 if groupname is omitted', (done) => {
      chai.request(app)
      .post('/api/groups/delete-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
    it('responds with status 400 if groupname is not provided', (done) => {
      chai.request(app)
      .post('/api/groups/delete-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: '   ',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done()
      });
    });
    it('responds with status 404 if group does not exist', (done) => {
      chai.request(app)
      .post('/api/groups/delete-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.staticGroups[3].groupname
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });
    it('responds with status 403 if user is not the group creator or admin', (done) => {
      chai.request(app)
      .post('/api/groups/delete-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.staticGroups[0].groupname,
      })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
    });
    it('responds with status 200 if group was successfully archived', (done) => {
      chai.request(app)
      .post('/api/groups/delete-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.staticGroups[1].groupname
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('When a user hit the route POST /api/groups/me/', () => {
    it('fetches only groups a user belong and responds with status 200',
    (done) => {
      chai.request(app)
      .get(`/api/groups/me`)
      .set('x-access-token', token)
      .type('form')
      .send()
      .end((error, res) => {
        res.should.have.status(200);
        // expect(res.body.message).to.eql('You have no group yet')
        done();
      });
    });
    it('responds with status 200 if groups exist',
    (done) => {
      chai.request(app)
      .get('/api/groups/me')
      .set('x-access-token', token2)
      .type('form')
      .send()
      .end((error, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('When a user hit the route POST /api/groups/:groupname/send-message/', () => {
    it('responds with status 400 if groupname is not provided',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${mockData.emptyString}/send-message`)
        .set('x-access-token', token2)
        .type('form')
        .send({
          message: mockData.longString[0],
          priority: 'critical'
        })
        .end((error, res) => {
          res.should.have.status(400);
          expect(res.body.error.message).to.eql('Bad request, groupname is required')
          done();
        });
    });
    it('responds with status 404 group does not exist',
    (done) => {
      const groupname = mockData.staticGroups[3].groupname;
      chai.request(app)
        .post(`/api/groups/${groupname}/send-message`)
        .set('x-access-token', token2)
        .type('form')
        .send({
          message: mockData.emptyString,
          priority: 'normal'
        })
        .end((error, res) => {
          res.should.have.status(404);
          expect(res.body.error.message).to.eql(`${groupname} does not exist on PostIt`)
          done();
        });
    });
    it('responds with status 400 if message body field is omitted',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${mockData.staticGroups[0].groupname}/send-message`)
        .set('x-access-token', token2)
        .type('form')
        .send({
          priority: 'urgent'
        })
        .end((error, res) => {
          res.should.have.status(400);
          expect(res.body.error.message).to.eql('You forgot to include a message body')
          done();
        });
    });
    it('responds with status 400 if message body is not provided',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${mockData.staticGroups[0].groupname}/send-message`)
        .set('x-access-token', token2)
        .type('form')
        .send({
          message: mockData.emptyString,
          priority: 'normal'
        })
        .end((error, res) => {
          res.should.have.status(400);
          expect(res.body.error.message).to.eql('You forgot to include a message body')
          done();
        });
    });
    it('responds with status 400 if a message priority field is omitted',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${mockData.staticGroups[0].groupname}/send-message`)
        .set('x-access-token', token2)
        .type('form')
        .send({
          message: mockData.longString[0]
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('Priority level is required')
          done();
        });
    });
    it('responds with status 400 if a message priority is not specified',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${mockData.staticGroups[0].groupname}/send-message`)
        .set('x-access-token', token2)
        .type('form')
        .send({
          message: mockData.longString[0],
          priority: ''
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('Priority level is required')
          done();
        });
    });
    it('responds with status 400 if a message priority is not valid',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${mockData.staticGroups[0].groupname}/send-message`)
        .set('x-access-token', token2)
        .type('form')
        .send({
          message: mockData.longString[0],
          priority: 'important'
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('Invalid priority level')
          done();
        });
    });
    it('responds with status 401 if message creator does not belong to group',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${mockData.staticGroups[0].groupname}/send-message`)
        .set('x-access-token', token)
        .type('form')
        .send({
          message: mockData.longString[0],
          priority: 'normal'
        })
        .end((error, res) => {
          res.should.have.status(401);
          res.body.error.message.should.equal
          (`User does not belong to group '${mockData.staticGroups[0].groupname}'`)
          done();
      });
    });
    it('responds with status 201 if message was created successfully, with priority normal',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${mockData.staticGroups[0].groupname}/send-message`)
        .set('x-access-token', token2)
        .type('form')
        .send({
          message: mockData.longString[0],
          priority: 'normal'
        })
        .end((error, res) => {
          res.should.have.status(201);
          expect(res.body.message).to.eql(mockData.longString[0]);
          expect(res.body.toGroup).to.eql(`${mockData.staticGroups[0].groupname}`);
          expect(res.body.priority).to.eql('normal');
          done();
      });
    });
    it('responds with status 201 if message was created successfully, with priority urgent',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${mockData.staticGroups[0].groupname}/send-message`)
        .set('x-access-token', token2)
        .type('form')
        .send({
          message: mockData.longString[0],
          priority: 'urgent'
        })
        .end((error, res) => {
          res.should.have.status(201);
          expect(res.body.message).to.eql(mockData.longString[0]);
          expect(res.body.toGroup).to.eql(`${mockData.staticGroups[0].groupname}`);
          expect(res.body.priority).to.eql('urgent');
          done();
      });
    });
    it('responds with status 201 if message was created successfully, with priority critical',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${mockData.staticGroups[0].groupname}/send-message`)
        .set('x-access-token', token2)
        .type('form')
        .send({
          message: mockData.longString[0],
          priority: 'critical'
        })
        .end((error, res) => {
          res.should.have.status(201);
          expect(res.body.message).to.eql(mockData.longString[0]);
          expect(res.body.toGroup).to.eql(`${mockData.staticGroups[0].groupname}`);
          expect(res.body.priority).to.eql('critical');
          done();
      });
    });
  });

  describe('When a user hit the route POST /api/groups/:groupname/show-messages/', () => {
    it('responds with status 400 if groupname is omitted',
    (done) => {
      chai.request(app)
        .get(`/api/groups/${mockData.emptyString}/show-messages`)
        .set('x-access-token', token2)
        .end((error, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('responds with status 404 if group does not exist',
    (done) => {
      chai.request(app)
        .get(`/api/groups/${mockData.staticGroups[3].groupname}/show-messages`)
        .set('x-access-token', token2)
        .end((error, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('responds with status 401 if user does not belong to group',
    (done) => {
      chai.request(app)
        .get(`/api/groups/${mockData.staticGroups[0].groupname}/show-messages`)
        .set('x-access-token', token)
        .end((error, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('responds with status 200 for group members and and an array of messages if group exist ',
    (done) => {
      chai.request(app)
        .get(`/api/groups/${mockData.staticGroups[0].groupname}/show-messages`)
        .set('x-access-token', token2)
        .end((error, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });
  });
});