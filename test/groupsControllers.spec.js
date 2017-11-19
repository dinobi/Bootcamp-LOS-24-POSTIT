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

  describe('When a user hits the route POST /api/create-group/', () => {
    it('responds with status 401 if token is not supplied', () => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        description: mockData.string
      })
      .end((err, res) => {
        res.should.have.status(401);
      });
    });
    it('responds with status 400 if groupname is omitted', () => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        description: mockData.string
      })
      .end((err, res) => {
        res.should.have.status(400);
      });
    });
    it('responds with status 400 if groupname is not provided', () => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: '   ',
        description: mockData.string
      })
      .end((err, res) => {
        res.should.have.status(400);
      });
    });
    it('responds with status 400 if description is omitted', () => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.string
      })
      .end((err, res) => {
        res.should.have.status(400);
      });
    });
    it('responds with status 400 if description is not provided', () => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.string,
        description: '  '
      })
      .end((err, res) => {
        res.should.have.status(400);
      });
    });
    it('responds with status 413 if groupname is more than 18 characters', () => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.longString,
        description: mockData.string
      })
      .end((err, res) => {
        res.should.have.status(413);
      });
    });
    it('responds with status 413 if description is more than 40 characters', () => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.string,
        description: mockData.longString
      })
      .end((err, res) => {
        res.should.have.status(413);
      });
    });
    it('responds with status 201 and creates a new group if supplied correct parameters', () => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send(mockData.staticGroups[1])
      .end((err, res) => {
        res.should.have.status(201);
      });
    });
    it('is case insensitive and responds with status 409 for similar groupnames', () => {
      chai.request(app)
      .post('/api/create-group/')
      .set('x-access-token', token)
      .type('form')
      .send(mockData.staticGroups[2])
      .end((err, res) => {
        res.should.have.status(409);
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
        username: mockData.randomUser.username
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
      chai.request(app)
      .post(`/api/groups/${mockData.string}/add-member/`)
      .type('form')
      .set('x-access-token', token)
      .send({
        username: mockData.staticUser[0].username
      })
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.error.message).to.eql(`${mockData.string} does not exist on PostIt`);
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

  describe('When a user hit the route POST /api/groups/me/', () => {
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
        username: mockData.randomUser.username
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
      chai.request(app)
      .post(`/api/groups/${mockData.string}/remove-member/`)
      .type('form')
      .set('x-access-token', token)
      .send({
        username: mockData.staticUser[0].username
      })
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.error.message).to.eql(`${mockData.string} does not exist on PostIt`);
        done();
      });
    });
    it('successfully removes a member and responds with status 200', (done) => {
      chai.request(app)
      .post(`/api/groups/${mockData.staticGroups[1].groupname}/remove-member/`)
      .type('form')
      .set('x-access-token', token)
      .send({
        username: mockData.staticUser[0].username
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.eql('john_doe was successfully removed from lfc');
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
      chai.request(app)
      .get(`/api/groups/${mockData.string}/members`)
      .set('x-access-token', token)
      .end((error, res) => {
        res.should.have.status(404);
        res.body.error.message.should.equal(
          `${mockData.string} does not exist on PostIt`
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
  });
  describe('When a user hits the route POST /api/groups/delete-group/', () => {
    it('responds with status 401 if token is not supplied', () => {
      chai.request(app)
      .post('/api/groups/delete-group')
      .set('x-access-token', '')
      .type('form')
      .send({
        groupname: mockData.string
      })
      .end((err, res) => {
        res.should.have.status(401);
      });
    });
    it('responds with status 400 if groupname is omitted', () => {
      chai.request(app)
      .post('/api/groups/delete-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
      })
      .end((err, res) => {
        res.should.have.status(400);
      });
    });
    it('responds with status 400 if groupname is not provided', () => {
      chai.request(app)
      .post('/api/groups/delete-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: '   ',
      })
      .end((err, res) => {
        res.should.have.status(400);
      });
    });
    it('responds with status 404 if group does not exist', () => {
      chai.request(app)
      .post('/api/groups/delete-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.string
      })
      .end((err, res) => {
        res.should.have.status(404);
      });
    });
    it('responds with status 403 if user is not the group creator or admin', () => {
      chai.request(app)
      .post('/api/groups/delete-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.staticGroups[0].groupname,
      })
      .end((err, res) => {
        res.should.have.status(403);
      });
    });
    it('responds with status 200 if group was successfully archived', () => {
      chai.request(app)
      .post('/api/groups/delete-group/')
      .set('x-access-token', token)
      .type('form')
      .send({
        groupname: mockData.staticGroups[1].groupname
      })
      .end((err, res) => {
        res.should.have.status(200);
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
        console.log('>>>>>>RESPONSE>>>>>', res.body);
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
          message: mockData.longString,
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
      chai.request(app)
        .post(`/api/groups/${mockData.string}/send-message`)
        .set('x-access-token', token2)
        .type('form')
        .send({
          message: mockData.emptyString,
          priority: 'normal'
        })
        .end((error, res) => {
          res.should.have.status(404);
          expect(res.body.error.message).to.eql(`${mockData.string} does not exist on PostIt`)
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
          message: mockData.longString
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
          message: mockData.longString,
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
          message: mockData.longString,
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
          message: mockData.longString,
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
          message: mockData.longString,
          priority: 'normal'
        })
        .end((error, res) => {
          res.should.have.status(201);
          expect(res.body.message).to.eql(mockData.longString);
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
          message: mockData.longString,
          priority: 'urgent'
        })
        .end((error, res) => {
          res.should.have.status(201);
          expect(res.body.message).to.eql(mockData.longString);
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
          message: mockData.longString,
          priority: 'critical'
        })
        .end((error, res) => {
          res.should.have.status(201);
          expect(res.body.message).to.eql(mockData.longString);
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
        .get(`/api/groups/${mockData.string}/show-messages`)
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