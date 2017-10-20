import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../server/app';
import models from '../server/models';

process.env.NODE_ENV = 'test';
const should = chai.should();
chai.use(chaiHttp);
let token;

models.User.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

models.Message.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

models.Group.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

models.UserGroup.destroy({
  where: {},
  cascade: true,
  truncate: true,
  restartIdentity: true
});
/**
 * Test all use cases including edge cases of the PostIt Api
 */
describe('PostIt Api Tests: ', () => {
  // creating a new user account
  //
  // Correct status code and message responses
  describe('Creating a new user account: ', () => {
    it('Creates a new user with status code 201',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobaggio',
          email: 'test@user.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((error, res) => {
          res.should.have.status(201);
          res.body.message.should.equal('User account successfully created.');
          token = res.body.authToken;
          done();
        });
    });
    it('does not require unique firstname, lastname, password and phone',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobaggio1',
          email: 'test@user1.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((error, res) => {
          res.should.have.status(201);
          res.body.message.should.equal('User account successfully created.');
          done();
        });
    });
    it('creates a unique username per user',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobaggio',
          email: 'test@user2.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((error, res) => {
          res.should.have.status(409);
          res.body.error.message.should.equal('Username already exists');
          done();
        });
    });
    it('creates a unique email per user',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobaggio2',
          email: 'test@user1.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((error, res) => {
          res.should.have.status(409);
          res.body.error.message.should.equal('Email already exists');
          done();
        });
    });
    it('does not allow numbers in firstname',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi4',
          lastname: 'kenkwo',
          username: 'dinobaggio2',
          email: 'test@user2.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('Firstname cannot contain digits');
          done();
        });
    });
    it('does not allow numbers in lastname',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo4',
          username: 'dinobaggio2',
          email: 'test@user2.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('Lastname cannot contain digits');
          done();
        });
    });
    it('does not allow empty field for firstname',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: '  ',
          lastname: 'kenkwo',
          username: 'dinobaggio2',
          email: 'test@user2.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('firstname field cannot be empty');
          done();
        });
    });
    it('does not allow empty field for lastname',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: '  ',
          username: 'dinobaggio2',
          email: 'test@user2.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('lastname field cannot be empty');
          done();
        });
    });
    it('does not allow empty field for username',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: '  ',
          email: 'test@user2.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('username field cannot be empty');
          done();
        });
    });
    it('does not allow empty field for email',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobaggio2',
          email: '  ',
          password: '123456',
          phone: '08032952998'
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('email field cannot be empty');
          done();
        });
    });
    it('does not allow empty field for password',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobaggio2',
          email: 'test@user2.com',
          password: '  ',
          phone: '08032952998'
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('password field cannot be empty');
          done();
        });
    });
    it('does not allow empty field for phone number',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobaggio2',
          email: 'test@user2.com',
          password: '123456',
          phone: '  '
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('phone field cannot be empty');
          done();
        });
    });
  });
  // Authenticate a user account
  
  // Correct status code and message responses
  describe('Login a user into their account: ', () => {
    it('(POST /api/user/signin/) authenticates a user',
    (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: 'dinobaggio',
          password: '123456'
        })
        .end((error, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Authentication successful');
          done();
        });
    });
    it('can also take a unique email as username for authentication',
    (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: 'test@user.com',
          password: '123456'
        })
        .end((error, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Authentication successful');
          done();
        });
    });
    it('does not authenticate an unknown username',
    (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: 'unknownUser',
          password: '123456'
        })
        .end((error, res) => {
          res.should.have.status(404);
          res.body.error.message.should.equal(
            'Authentication failed. Username is incorrect or does not exist'
          );
          done();
        });
    });
    it('does not authenticate an unknown email as username',
    (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: 'unknownemail@postit.comr',
          password: '123456'
        })
        .end((error, res) => {
          res.should.have.status(404);
          res.body.error.message.should.equal(
            'Authentication failed. Email is incorrect or does not exist'
          );
          done();
        });
    });
    it('does not authenticate an incorrect password',
    (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: 'dinobaggio',
          password: '1234567'
        })
        .end((error, res) => {
          res.should.have.status(404);
          res.body.error.message.should.equal(
            'Authentication failed. Incorrect password'
          );
          done();
        });
    });
    it('requires a username', (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: '',
          password: '123456'
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('username field cannot be empty');
          done();
        });
    });
    it('requires a password', (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: 'test@user.com',
          password: ''
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('password field cannot be empty');
          done();
        });
    });
  });

  describe('View all registered users', () => {

  });

  describe('Search postit for users and groups', () => {

  });
  // Create Group
  // Correct status code responses
  describe('Create a new group', () => {
    it('allows only authenticated users to create new groups',
    (done) => {
      chai.request(app)
        .post('/api/create-group/')
        .set('x-access-token', '')
        .type('form')
        .send({
          groupname: 'Test group',
          description: 'A Test Group',
        })
        .end((error, res) => {
          res.should.have.status(401);
          res.body.error.message.should.equal(
            'Unauthorized: No access token provided'
          );
          done();
        });
    });
    it('Creates a new group with status code 201',
    (done) => {
      chai.request(app)
        .post('/api/create-group/')
        .set('x-access-token', token)
        .type('form')
        .send({
          groupname: 'Test group',
          description: 'A Test Group',
        })
        .end((error, res) => {
          res.should.have.status(201);
          res.body.message.should.equal(
            'Group - Test group, was created successfully'
          );
          done();
        });
    });
    it('responds with status code 400 if groupname is not supplied',
    (done) => {
      chai.request(app)
        .post('/api/create-group/')
        .set('x-access-token', token)
        .type('form')
        .send({
          groupname: '   ',
          description: 'A Test Group',
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('A group name is required');
          done();
        });
    });
    it('response status code 400 if description is not supplied',
    (done) => {
      chai.request(app)
        .post('/api/create-group/')
        .set('x-access-token', token)
        .type('form')
        .send({
          groupname: 'Test Group',
          description: '   ',
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal(
            'A group description is required');
          done();
        });
    });
    it('responds with status code 409 if groupname already exist',
    (done) => {
      chai.request(app)
        .post('/api/create-group/')
        .set('x-access-token', token)
        .type('form')
        .send({
          groupname: 'Test group',
          description: 'A dupliacte test group',
        })
        .end((error, res) => {
          res.should.have.status(409);
          res.body.error.message.should.equal(
            'Group - Test group, Already Exist'
          );
          done();
        });
    });
    it('creates a group with similar description but different names',
    (done) => {
      chai.request(app)
        .post('/api/create-group/')
        .set('x-access-token', token)
        .type('form')
        .send({
          groupname: 'Test group2',
          description: 'A duplicate test group',
        })
        .end((error, res) => {
          res.should.have.status(201);
          res.body.message.should.equal(
            'Group - Test group2, was created successfully'
          );
          done();
        });
    });
  });
  // Fetching all created groups
  describe('View all created groups', () => {
    it('responds with status 200 if groups exist',
    (done) => {
      chai.request(app)
        .get('/api/groups/')
        .set('x-access-token', token)
        .type('form')
        .send()
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('responds with status 204 if no group exist',
    (done) => {
      models.Group.destroy({
        cascade: true,
        truncate: true,
        restartIdentity: true
      });
      chai.request(app)
        .get('/api/groups/')
        .set('x-access-token', token)
        .type('form')
        .send()
        .end((error, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
  // Delete a user created group
  describe('Delete an existing group', () => {
    it('responds with status 404 if group does not exist',
    (done) => {
      chai.request(app)
        .post('/api/groups/Test group/delete-group/')
        .set('x-access-token', token)
        .type('form')
        .send()
        .end((error, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('Add or remove user from a group', () => {

  });

  describe('View group members', () => {

  });
  describe('Send message to a group', () => {

  });

  describe('View all group messages', () => {

  });
});
