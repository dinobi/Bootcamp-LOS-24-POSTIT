import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import models from '../server/models';

process.env.NODE_ENV = 'test';
const should = chai.should();
chai.use(chaiHttp);

models.User.destroy({
  where: {},
  cascade: true,
  truncate: true
});

models.Message.destroy({
  where: {},
  cascade: true,
  truncate: true
});

models.Group.destroy({
  where: {},
  cascade: true,
  truncate: true
});

models.UserGroup.destroy({
  where: {},
  cascade: true,
  truncate: true
});
/**
 * Test all use cases including edge cases of the PostIt Api
 */
describe('PostIt Api Tests: ', () => {
  // creating a new user account
  //
  // Correct status code responses
  describe('Creating a new user account: ', () => {
    it('(POST /api/user/signup/) creates a new user with status code 201', (done) => {
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
          done();
        });
    });
    it('does not require unique firstname, lastname, password and phone', (done) => {
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
    it('creates a unique username per user', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: 'dinobaggio'
        })
        .then((res) => {
          res.should.have.status(400);
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
    it('creates a unique email per user', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          email: 'test@user.com',
        })
        .then((res) => {
          res.should.have.status(400);
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
    it('does not allow numbers in firstname', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'fistname12',
        })
        .then((res) => {
          res.should.have.status(400);
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
    it('does not allow numbers in lastname', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          lastname: 'lastname34',
        })
        .then((res) => {
          res.should.have.status(400);
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
    it('does not allow empty field for firstname', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: '',
        })
        .then((res) => {
          res.should.have.status(400);
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
    it('does not allow empty field for lastname', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          lastname: '',
        })
        .then((res) => {
          res.should.have.status(400);
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
    it('does not allow empty field for username', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: '',
        })
        .then((res) => {
          res.should.have.status(400);
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
    it('does not allow empty field for email', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          email: '',
        })
        .then((res) => {
          res.should.have.status(400);
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
    it('does not allow empty field for password', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          password: '',
        })
        .then((res) => {
          res.should.have.status(400);
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
    it('does not allow empty field for phone number', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          phone: '',
        })
        .then((res) => {
          res.should.have.status(400);
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
    it('considers phone numbers less that 11 as invalid', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          phone: '0803295299',
        })
        .then((res) => {
          res.should.have.status(400);
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
    it('considers phone numbers more than 13 as invalid', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          phone: '23408032952998',
        })
        .end((res) => {
          res.should.have.status(400);
          done();
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
  // creating a new user account
  //
  // quality response message
    it('responds with correct message for account creation ', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'dinobi',
          lastname: 'kenkwo',
          username: 'dinobaggio2',
          email: 'test@user2.com',
          password: '123456',
          phone: '08032952998'
        })
        .end((err, res) => {
          res.body.message.should.equal('User account successfully created.');
          done();
        });
    });    
    it('responds with correct message for unique username violation', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: 'dinobaggio',
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
          email: 'test@user.com',
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
          email: 'testuser',
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
          firstname: 'fistname12',
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
          lastname: 'lastname34',
        })
        .end((err, res) => {
          res.body.error.message.should.equal('lastname cannot contain digits');
          done();
        });
    });
    it('responds with correct message if firstname field is empty', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: '',
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
          lastname: '',
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
          username: '',
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
          email: '',
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
          password: '',
        })
        .end((err, res) => {
          res.body.error.message.should.equal('password field cannot be empty.');
          done();
        });
    });
    it('responds with correct message if phone field is empty', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          phone: '',
        })
        .end((err, res) => {
          res.body.error.message.should.equal('phone field cannot be empty.');
          done();
        });
    });
    // it('responds with correct message if phone numbers is less than 11', (done) => {
    //   chai.request(app)
    //     .post('/api/user/signup/')
    //     .type('form')
    //     .send({
    //       phone: '0803295299',
    //     })
    //     .end((err, res) => {
    //       res.body.error.message.should.equal('phone number cannot be less than 11 digits.');
    //       done();
    //     });
    // });
    // it('responds with correct message if phone numbers is more than 13', (done) => {
    //   chai.request(app)
    //     .post('/api/user/signup/')
    //     .type('form')
    //     .send({
    //       phone: '23408032952998',
    //     })
    //     .end((err, res) => {
    //       res.body.error.message.should.equal('phone number cannot be more than 13 digits.');
    //       done();
    //     });
    // });
  });
  // Authenticate a user account
  //
// Correct status code responses
  describe('Login a user into their account: ', () => {
    it('(POST /api/user/signin/) authenticates a user', (done) => {
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
    // it('can also take a unique email as username', (done) => {
    //   chai.request(app)
    //     .post('/api/user/signin/')
    //     .type('form')
    //     .send({
    //       username: 'test@user.com',
    //       password: '123456'
    //     })
    //     .end((error, res) => {
    //       res.should.have.status(200);
    //       done();
    //     });
    // });
  });

  describe('View all registered users', () => {

  });

  describe('Search postit for users and groups', () => {

  });

  describe('Create a new group', () => {

  });

  describe('View all created groups', () => {

  });

  describe('Delete an existing group', () => {

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
