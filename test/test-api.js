import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../server/app';
import models from '../server/models';
import { users, groups, messages } from './mockInput';

process.env.NODE_ENV = 'test';
const should = chai.should();
chai.use(chaiHttp);
let token;
let token2;

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
        .send(users[0])
        .end((error, res) => {
          res.should.have.status(201);
          res.body.message.should.equal('User account successfully created.');
          token = res.body.authToken;
          done();
        });
    });
    it('does not require unique password and phone',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: users[1].username,
          email: users[1].email,
          password: users[0].password,
          phone: users[0].phone
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
          username: users[0].username,
          email: users[2].email,
          password: users[2].password,
          phone: users[2].phone
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
          username: users[2].username,
          email: users[0].email,
          password: users[2].password,
          phone: users[2].phone
        })
        .end((error, res) => {
          res.should.have.status(409);
          res.body.error.message.should.equal('Email already exists');
          done();
        });
    });
    it('does not allow empty field for username',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: '  ',
          email: users[1].email,
          password: users[1].password,
          phone: users[1].phone
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
          username: users[1].username,
          email: '  ',
          password: users[1].password,
          phone: users[1].phone
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
          username: users[1].username,
          email: users[1].email,
          password: '  ',
          phone: users[1].phone
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
          username: users[1].username,
          email: users[1].email,
          password: users[1].password,
          phone: '  '
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('phone field cannot be empty');
          done();
        });
    });
    it('does not allow invalid email',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: users[1].username,
          email: 'invalid@gmail',
          password: users[1].password,
          phone: users[1].phone
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('Enter a valid email');
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
          username: users[0].username,
          password: users[0].password
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
          username: users[0].email,
          password: users[0].password
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
          username: 'unknownUsername',
          password: users[1].password
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
          username: 'unknownUser@postit.com',
          password: users[0].password
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
          username: users[0].username,
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
    it('responds with status 400 if username is not supplied', (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: '',
          password: users[0].password
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('username field cannot be empty');
          done();
        });
    });
    it('responds with status 400 if password is not supplied', (done) => {
      chai.request(app)
        .post('/api/user/signin/')
        .type('form')
        .send({
          username: users[0].username,
          password: ''
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('password field cannot be empty');
          done();
        });
    });
  });

  describe('fetch all registered users', () => {
    it('responds with status 401 if a user is not authenticated ', (done) => {
      chai.request(app)
        .get('/api/users/')
        .set('x-access-token', '')
        .end((error, res) => {
          res.should.have.status(401);
          res.body.error.message.should.equal(
            'Unauthorized: No access token provided'
          );
          done();
        });
    });
    it('responds with status 200 and an array of registered users', (done) => {
      chai.request(app)
        .get('/api/users/')
        .set('x-access-token', token)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('success');
          done();
        });
    });
  });

  describe('Search postit for users and groups', () => {
  });
  // Create Group
  // Correct status code responses
  describe('Create a new group', () => {
    it('responds with status 401 for unauthenticated users',
    (done) => {
      chai.request(app)
        .post('/api/create-group/')
        .set('x-access-token', '')
        .type('form')
        .send(groups[0])
        .end((error, res) => {
          res.should.have.status(401);
          res.body.error.message.should.equal(
            'Unauthorized: No access token provided'
          );
          done();
        });
    });
    it('responds with status 204 if no group exist',
    (done) => {
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
    it('Creates a new group with status code 201',
    (done) => {
      chai.request(app)
        .post('/api/create-group/')
        .set('x-access-token', token)
        .type('form')
        .send(groups[0])
        .end((error, res) => {
          res.should.have.status(201);
          res.body.message.should.equal(
            'alc was created successfully'
          );
          done();
        });
    });
    it('is case insensitive and returns status 409 for similar group names',
    (done) => {
      chai.request(app)
        .post('/api/create-group/')
        .set('x-access-token', token)
        .type('form')
        .send(groups[1])
        .end((error, res) => {
          res.should.have.status(409);
          res.body.error.message.should.equal(
            'alc already exist'
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
          description: groups[0].description,
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
          groupname: groups[0].groupname,
          description: '   ',
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal(
            'A group description is required');
          done();
        });
    });
    it('response status code 413 if groupname exceeds 18 characters',
    (done) => {
      chai.request(app)
        .post('/api/create-group/')
        .set('x-access-token', token)
        .type('form')
        .send(groups[3])
        .end((error, res) => {
          res.should.have.status(413);
          res.body.error.message.should.equal(
            'groupname is too large. max of 18 characters is allowed');
          done();
        });
    });
    it('response status code 413 if groupname exceeds 40 characters',
    (done) => {
      chai.request(app)
        .post('/api/create-group/')
        .set('x-access-token', token)
        .type('form')
        .send(groups[4])
        .end((error, res) => {
          res.should.have.status(413);
          res.body.error.message.should.equal(
            'description is too large. max of 40 characters is allowed');
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
          groupname: groups[2].groupname,
          description: groups[0].description,
        })
        .end((error, res) => {
          res.should.have.status(201);
          res.body.message.should.equal(
            'rainier was created successfully'
          );
          done();
        });
    });
  });

  // Archive a user created group
  describe('Archive an existing group', () => {
    it('responds with status 401 if user is not authenticated',
    (done) => {
      chai.request(app)
        .post('/api/groups/delete-group/')
        .set('x-access-token', '')
        .type('form')
        .send({
          groupname: ''
        })
        .end((error, res) => {
          res.should.have.status(401);
          res.body.error.message.should.equal(
            'Unauthorized: No access token provided'
          );
          done();
        });
    });
    it('responds with status 400 if groupname is not supplied',
    (done) => {
      chai.request(app)
        .post('/api/groups/delete-group/')
        .set('x-access-token', token)
        .type('form')
        .send({
          groupname: ''
        })
        .end((error, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('responds with status 404 if group does not exist',
    (done) => {
      chai.request(app)
        .post('/api/groups/delete-group/')
        .set('x-access-token', token)
        .type('form')
        .send({
          groupname: 'TestGroup'
        })
        .end((error, res) => {
          res.should.have.status(404);
          res.body.error.message.should.equal('testgroup does not exist')
          done();
        });
    });
    // it('responds with status 403 if user is not the group creator',
    // (done) => {
    //   chai.request(app)
    //     .post('/api/groups/delete-group/')
    //     .set('x-access-token', newToken)
    //     .type('form')
    //     .send({
    //       groupname: groups[0].groupname
    //     })
    //     .end((error, res) => {
    //       res.should.have.status(404);
    //       res.body.error.message.should.equal(
    //         `You do not have permission to delete ${group[0].groupname}`
    //       )
    //       done();
    //     });
    // });
    it('responds with status 200 if was successfully archived',
    (done) => {
      chai.request(app)
        .post('/api/groups/delete-group/')
        .set('x-access-token', token)
        .type('form')
        .send({
          groupname: 'rainier'
        })
        .end((error, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('rainier has been archived')
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
  });
  // Fetching all my created groups
  describe('View a user created groups', () => {
    // it('responds with status 204 if none exist',
    // (done) => {
    //   chai.request(app)
    //     .get('/api/groups/me')
    //     .set('x-access-token', token)
    //     .type('form')
    //     .send()
    //     .end((error, res) => {
    //       res.should.have.status(204);
    //       done();
    //     });
    // });
    it('responds with status 200 groups exist',
    (done) => {
      chai.request(app)
        .get('/api/groups/me')
        .set('x-access-token', token)
        .type('form')
        .send()
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('Adding member to a group', () => {
    it('responds with status 401 if username is not authenticated',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${groups[0].groupname}/add-member`)
        .set('x-access-token', '')
        .type('form')
        .send({
          username: users[1].username
        })
        .end((error, res) => {
          res.should.have.status(401);
          res.body.error.message.should.equal(
            'Unauthorized: No access token provided'
          )
          done();
        });
    });
    it('responds with status 400 if groupname is not supplied as query param',
    (done) => {
      chai.request(app)
        .post(`/api/groups/ /add-member`)
        .set('x-access-token', token)
        .type('form')
        .send({
          username: users[1].username
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal(
            'Bad request, go to group you want to add member'
          )
          done();
        });
    });
    it('responds with status 400 if username is not supplied',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${groups[0].groupname}/add-member`)
        .set('x-access-token', token)
        .type('form')
        .send({
          username: ''
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal(
            'Bad request, username is required'
          )
          done();
        });
    });
    it('responds with status 404 if group does not exist',
    (done) => {
      chai.request(app)
        .post('/api/groups/TestGroup/add-member')
        .set('x-access-token', token)
        .type('form')
        .send({
          username: users[1].username
        })
        .end((error, res) => {
          res.should.have.status(404);
          res.body.error.message.should.equal(
            'Group not found or has not been created'
          )
          done();
        });
    });
    it('responds with status 404 if user does not exist',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${groups[1].groupname}/add-member`)
        .set('x-access-token', token)
        .type('form')
        .send({
          username: users[2].username
        })
        .end((error, res) => {
          res.should.have.status(404);
          res.body.error.message.should.equal(
            'User not found. User has no PostIt account'
          )
          done();
        });
    });
    it('responds with status 201 if user is added successfully',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${groups[1].groupname}/add-member`)
        .set('x-access-token', token)
        .type('form')
        .send({
          username: users[1].username
        })
        .end((error, res) => {
          res.should.have.status(201);
          res.body.message.should.equal(
            `${users[1].username} was added to ${groups[1].groupname}`
          )
          done();
        });
    });
    it("responds with status 409 when there's an attempt to add an existing user",
    (done) => {
      chai.request(app)
        .post(`/api/groups/${groups[1].groupname}/add-member`)
        .set('x-access-token', token)
        .type('form')
        .send({
          username: users[1].username
        })
        .end((error, res) => {
          res.should.have.status(409);
          res.body.error.message.should.equal(
            'User already belong to group'
          )
          done();
        });
    });
  });
  describe('View group members', () => {
    it('responds with status 401 if user is not authenticated',
    (done) => {
      chai.request(app)
        .get(`/api/groups/${groups[0].groupname}/members`)
        .set('x-access-token', '')
        .end((error, res) => {
          res.should.have.status(401);
          res.body.error.message.should.equal(
            'Unauthorized: No access token provided'
          )
          done();
        });
    });
    it('responds with status 400 if no group is specified',
    (done) => {
      chai.request(app)
        .get(`/api/groups/ /members`)
        .set('x-access-token', token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal(
            'Bad request, go to group you want to view its member'
          )
          done();
        });
    });
    it('responds with status 400 if group does not exist',
    (done) => {
      chai.request(app)
        .get(`/api/groups/${groups[2].groupname}/members`)
        .set('x-access-token', token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal(
            `Group - ${groups[2].groupname} does not exist`
          )
          done();
        });
    });
    it('responds with status 400 if group does not exist',
    (done) => {
      chai.request(app)
        .get(`/api/groups/${groups[2].groupname}/members`)
        .set('x-access-token', token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal(
            `Group - ${groups[2].groupname} does not exist`
          )
          done();
        });
    });
    it('responds with status 200 if members exist',
    (done) => {
      chai.request(app)
        .get(`/api/groups/${groups[1].groupname}/members`)
        .set('x-access-token', token)
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Remove member from group', () => {
    it('responds with status 401 if user is not authenticated',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${groups[1].groupname}/remove-member`)
        .set('x-access-token', '')
        .type('form')
        .send({
          username: users[1].username
        })
        .end((error, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('responds with status 400 if groupname is not supplied',
    (done) => {
      chai.request(app)
        .post('/api/groups/ /remove-member')
        .set('x-access-token', token)
        .type('form')
        .send({
          username: users[1].username
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal(
            'Bad request, go to group you want to remove member'
          )
          done();
        });
    });
    it('responds with status 400 if username is not supplied',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${groups[1].groupname}/remove-member`)
        .set('x-access-token', token)
        .type('form')
        .send({
          username: ' '
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal(
            'Bad request, username is required'
          )
          done();
        });
    });
    it('responds with status 404 if group is not found',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${groups[2].groupname}/remove-member`)
        .set('x-access-token', token)
        .type('form')
        .send({
          username: users[1].username
        })
        .end((error, res) => {
          res.should.have.status(404);
          res.body.error.message.should.equal(
            'Group not found or has not been created'
          )
          done();
        });
    });
    it('responds with status 404 if user is not found',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${groups[1].groupname}/remove-member`)
        .set('x-access-token', token)
        .type('form')
        .send({
          username: users[2].username
        })
        .end((error, res) => {
          res.should.have.status(404);
          res.body.error.message.should.equal(
            'User not found. User has no PostIt account'
          )
          done();
        });
    });
    it('responds with status 200 if user is successfully removed',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${groups[1].groupname}/remove-member`)
        .set('x-access-token', token)
        .type('form')
        .send({
          username: users[1].username
        })
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('responds with status 404 if user is not an existing member',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${groups[1].groupname}/remove-member`)
        .set('x-access-token', token)
        .type('form')
        .send({
          username: users[1].username
        })
        .end((error, res) => {
          res.should.have.status(404);
          res.body.error.message.should.equal(`No such user in ${groups[1].groupname}`)
          done();
        });
    });
  });

  describe('Send message to group', () => {
    it('responds with status 401 if user is not authenticated',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${groups[1].groupname}/remove-member`)
        .set('x-access-token', '')
        .type('form')
        .send({
          username: users[1].username
        })
        .end((error, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('responds with status 400 if a message body is ommitted',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${groups[1].groupname}/send-message`)
        .set('x-access-token', token)
        .type('form')
        .send({
          message: '',
          priority: messages[0].priority
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('You forgot to include a message body')
          done();
        });
    });
    it('responds with status 400 if a message priority is not specified',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${groups[1].groupname}/send-message`)
        .set('x-access-token', token)
        .type('form')
        .send({
          message: messages[0].message,
          priority: ''
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('Invalid priority level')
          done();
        });
    });
    it('Creates a new user',
    (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send(users[2])
        .end((error, res) => {
          token2 = res.body.authToken;
          done();
        });
    });
    it('responds with status 401 if user does not belong to group',
    (done) => {
      chai.request(app)
        .post(`/api/groups/${groups[1].groupname}/send-message`)
        .set('x-access-token', token2)
        .type('form')
        .send(messages[0])
        .end((error, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
  // fetch group messages
  describe('View all group messages', () => {
    it('responds with status 404 if group does not exist',
    (done) => {
      chai.request(app)
        .get(`/api/groups/${groups[2].groupname}/show-messages`)
        .set('x-access-token', token)
        .end((error, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('responds with status 200 if group exist',
    (done) => {
      chai.request(app)
        .get(`/api/groups/${groups[1].groupname}/show-messages`)
        .set('x-access-token', token)
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Delete a user created group', () => {
    
      });
});
