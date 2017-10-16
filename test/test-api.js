import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
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
  // Correct status code responses
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
          lastname: 'kenkwo4',
          username: '',
          email: 'test@user2.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((error, res) => {
          res.should.have.status(400);
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
          lastname: 'kenkwo4',
          username: 'dinobaggio2',
          email: ' ',
          password: '123456',
          phone: '08032952998'
        })
        .end((error, res) => {
          res.should.have.status(400);
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
          lastname: 'kenkwo4',
          username: 'dinobaggio2',
          email: 'test@user2.com',
          password: '  ',
          phone: '08032952998'
        })
        .end((error, res) => {
          res.should.have.status(400);
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
          lastname: 'kenkwo4',
          username: 'dinobaggio2',
          email: 'test@user2.com',
          password: '123456',
          phone: '  '
        })
        .end((error, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('considers phone numbers less that 11 as invalid',
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
          phone: '080329529'
        })
        .end((error, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('considers phone numbers more than 13 as invalid',
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
          phone: '0803295234566677'
        })
        .end((error, res) => {
          res.should.have.status(400);
          done();
        });
    });
  // creating a new user account
  //
  // quality response messages
    it('responds with correct message for account creation ',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobaggio3',
          email: 'dinobaggio2@postit.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((err, res) => {
          res.body.message.should.equal('User account successfully created.');
          done();
        });
    });
    it('responds with correct message for unique username violation',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobaggio3',
          email: 'dinobaggio@postit.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((err, res) => {
          res.body.error.message.should.equal('Username already exists');
          done();
        });
    });
    it('responds with correct message for unique email violation', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobiK',
          email: 'dinobaggio2@postit.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((err, res) => {
          res.body.error.message.should.equal('Email already exists');
          done();
        });
    });
    it('responds with correct message for email format violation', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobaggio1',
          email: 'dinobaggio',
          password: '123456',
          phone: '08032952998'
        })
        .end((err, res) => {
          res.body.error.message.should.equal('Enter a valid email');
          done();
        });
    });
    it('responds with correct message for email format violation', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobaggio4',
          email: 'dinobaggio@postit',
          password: '123456',
          phone: '08032952998'
        })
        .end((err, res) => {
          res.body.error.message.should.equal('Enter a valid email');
          done();
        });
    });
    it('responds with correct message for email format violation', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobaggio5',
          email: 'dinobaggio-postit.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((err, res) => {
          res.body.error.message.should.equal('Enter a valid email');
          done();
        });
    });
    it('responds with correct message for firstname format violation', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi6',
          lastname: 'kenkwo',
          username: 'dinobaggio6',
          email: 'dinobaggio6@postit.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((err, res) => {
          res.body.error.message.should.equal('Firstname cannot contain digits');
          done();
        });
    });
    it('responds with correct message for laststname format violation', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo7',
          username: 'dinobaggio7',
          email: 'dinobaggio7@postit.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((err, res) => {
          res.body.error.message.should.equal('Lastname cannot contain digits');
          done();
        });
    });
    it('responds with correct message if firstname field is empty', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: '',
          lastname: 'kenkwo',
          username: 'dinobaggio8',
          email: 'dinobaggio8@postit.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((err, res) => {
          res.body.error.message.should.equal('firstname field cannot be empty');
          done();
        });
    });
    it('responds with correct message if lastname field is empty', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: '',
          username: 'dinobaggio9',
          email: 'dinobaggio9@postit.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((err, res) => {
          res.body.error.message.should.equal('lastname field cannot be empty');
          done();
        });
    });
    it('responds with correct message if username field is empty', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: '',
          email: 'dinobi@postit.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((err, res) => {
          res.body.error.message.should.equal('username field cannot be empty');
          done();
        });
    });
    it('responds with correct message if email field is empty', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobi1',
          email: '',
          password: '123456',
          phone: '08032952998'
        })
        .end((err, res) => {
          res.body.error.message.should.equal('email field cannot be empty');
          done();
        });
    });
    it('responds with correct message if password field is empty', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobi2',
          email: 'dinobi2@postit.com',
          password: '',
          phone: '08032952998'
        })
        .end((err, res) => {
          res.body.error.message.should.equal('password field cannot be empty');
          done();
        });
    });
    it('responds with correct message if phone field is empty', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobi3',
          email: 'dinobi3@postit.com',
          password: '123456',
          phone: ''
        })
        .end((err, res) => {
          res.body.error.message.should.equal('phone field cannot be empty');
          done();
        });
    });
  });
  // Authenticate a user account
  //
  // Correct status code responses
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
          done();
        });
    });
    // Correct response messages
    it('responds with correct message for successful authentication',
    (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: 'dinobaggio',
          password: '123456'
        })
        .end((error, res) => {
          res.body.message.should.equal('Authentication successful');
          done();
        });
    });
    it(
      'responds with correct message for successful authentication using email',
    (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: 'test@user.com',
          password: '123456'
        })
        .end((error, res) => {
          res.body.message.should.equal('Authentication successful');
          done();
        });
    });
    it('responds with correct message for unknown username',
    (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: 'unknownUsername',
          password: '123456'
        })
        .end((error, res) => {
          res.body.error.message.should.equal(
            'Authentication failed. Username is incorrect or does not exist'
          );
          done();
        });
    });
    it('responds with correct message for unknown email',
    (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: 'unknownEmail@postit.comr',
          password: '123456'
        })
        .end((error, res) => {
          res.body.error.message.should.equal(
            'Authentication failed. Email is incorrect or does not exist'
          );
          done();
        });
    });
    it('responds with correct message for incorrect password',
    (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: 'dinobaggio',
          password: '1234567'
        })
        .end((error, res) => {
          res.body.error.message.should.equal(
            'Authentication failed. Incorrect password'
          );
          done();
        });
    });
    it('responds with correct message for empty username field',
    (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: '',
          password: '123456'
        })
        .end((error, res) => {
          res.body.error.message.should.equal('username field cannot be empty');
          done();
        });
    });
    it('responds with correct message for empty password field',
    (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: 'test@user.com',
          password: ''
        })
        .end((error, res) => {
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
          done();
        });
    });
    // Create Group
    // Correct response messages
    it('responds with correct message for unauthorized users',
    (done) => {
      chai.request(app)
        .post('/api/create-group/')
        .set('x-access-token', '')
        .type('form')
        .send({
          groupname: 'Test group1',
          description: 'A Test Group',
        })
        .end((error, res) => {
          res.body.error.message.should.equal(
            'Unauthorized: No access token provided'
          );
          done();
        });
    });
    it('responds with correct message for successful creation',
    (done) => {
      chai.request(app)
        .post('/api/create-group/')
        .set('x-access-token', token)
        .type('form')
        .send({
          groupname: 'Test group3',
          description: 'A Test Group',
        })
        .end((error, res) => {
          res.body.message.should.equal(
            'Group - Test group3, was created successfully'
          );
          done();
        });
    });
    it('responds with correct message for blank groupname',
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
          res.body.error.message.should.equal('A group name is required');
          done();
        });
    });
    it('responds with correct message for blank group desciption',
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
          res.body.error.message.should.equal(
            'A group description is required')
            ;
          done();
        });
    });
    it('responds with correct message for duplicate groupname',
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
          res.body.error.message.should.equal(
            'Group - Test group, Already Exist'
          );
          done();
        });
    });
    it('responds with success for similar description but different names',
    (done) => {
      chai.request(app)
        .post('/api/create-group/')
        .set('x-access-token', token)
        .type('form')
        .send({
          groupname: 'Test group4',
          description: 'A dupliacte test group',
        })
        .end((error, res) => {
          res.body.message.should.equal(
            'Group - Test group4, was created successfully'
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
