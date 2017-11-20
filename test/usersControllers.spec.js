import chaiHttp from 'chai-http';
import chai from 'chai';
import dotenv from 'dotenv';
import app from '../server/app';
import models from '../server/models';
import mockData from '../client/src/spec/mocks/mockData';

dotenv.config();
process.env.NODE_ENV = 'test';
const should = chai.should();
chai.use(chaiHttp);
let token;
let hash;

models.User.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});
models.PasswordReset.destroy({
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
  cascade: true,
  truncate: true,
  restartIdentity: true
});
models.Message.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

describe('usersControllersTest ', () => {
  describe('When a user hits the route POST /api/user/signup/', () => {
    it('creates a new account and responds with status 201 when supplied correct parameters',
    (done) => {
      chai.request(app)
      .post('/api/user/signup/')
      .type('form')
      .send(mockData.staticUser[0])
      .end((error, res) => {
        res.should.have.status(201);
        res.body.message.should.equal('User account successfully created.');
        token = res.body.authToken;
        done();
      });
    });
    it('responds with status 400 for omitted username field', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          email: mockData.staticUser[0].email,
          password: mockData.staticUser[0].password,
          phone: mockData.staticUser[0].phone
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('username field cannot be empty');
          done();
        });
    });
    it('responds with status 400 for omitted email field', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: mockData.staticUser[0].username,
          password: mockData.staticUser[0].password,
          phone: mockData.staticUser[0].phone
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('email field cannot be empty');
          done();
        });
    });
    it('responds with status 400 for omitted password field', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: mockData.staticUser[0].username,
          email: mockData.staticUser[0].email,
          phone: mockData.staticUser[0].phone
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('password field cannot be empty');
          done();
        });
    });
    it('responds with status 400 for omitted phone field', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: mockData.staticUser[0].username,
          email: mockData.staticUser[0].email,
          password: mockData.staticUser[0].password
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('phone field cannot be empty');
          done();
        });
    });
    it('responds with status 400 for empty username field', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: '  ',
          email: mockData.staticUser[0].email,
          password: mockData.staticUser[0].password,
          phone: mockData.staticUser[0].phone
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('username field cannot be empty');
          done();
        });
    });
    it('responds with status 400 for empty email field', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: mockData.staticUser[0].username,
          email: '   ',
          password: mockData.staticUser[0].password,
          phone: mockData.staticUser[0].phone
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('email field cannot be empty');
          done();
        });
    });
    it('responds with status 400 for empty password field', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: mockData.staticUser[0].username,
          email: mockData.staticUser[0].email,
          password: '  ',
          phone: mockData.staticUser[0].phone
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('password field cannot be empty');
          done();
        });
    });
    it('responds with status 400 for empty phone field', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: mockData.staticUser[0].username,
          email: mockData.staticUser[0].email,
          password: mockData.staticUser[0].password,
          phone: '  '
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('phone field cannot be empty');
          done();
        });
    });
    it('responds with status 400 for invalid email', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: mockData.staticUser[0].username,
          email: mockData.staticUser[3].email,
          password: mockData.staticUser[0].password,
          phone: mockData.staticUser[0].phone
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('Enter a valid email');
          done();
        });
    });
    it('responds with status 409 if username already exist', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: mockData.staticUser[0].username,
          email: mockData.staticUser[1].email,
          password: mockData.staticUser[1].password,
          phone: mockData.staticUser[1].phone
        })
        .end((error, res) => {
          res.should.have.status(409);
          res.body.error.message.should.equal('Username already exists');
          done();
        });
    });
    it('responds with status 413 if username exceeds 18 characters', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: mockData.longString[2],
          email: mockData.staticUser[1].email,
          password: mockData.staticUser[1].password,
          phone: mockData.staticUser[1].phone
        })
        .end((error, res) => {
          res.should.have.status(413);
          res.body.error.message.should.equal('username should not exceed 18 characters');
          done();
        });
    });
    it('responds with status 409 if email already exist', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: mockData.staticUser[1].username,
          email: mockData.staticUser[0].email,
          password: mockData.staticUser[0].password,
          phone: mockData.staticUser[0].phone
        })
        .end((error, res) => {
          res.should.have.status(409);
          res.body.error.message.should.equal('Email already exists');
          done();
        });
    });
    it('responds with status 400 for invalid phone number', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: mockData.staticUser[1].username,
          email: mockData.staticUser[1].email,
          password: mockData.staticUser[1].password,
          phone: mockData.staticUser[4].phone
        })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('Enter a valid phone');
          done();
        });
    });
    it('returns 201 because it does not require a unique password and phone', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          username: mockData.staticUser[4].username,
          email: mockData.staticUser[4].email,
          password: mockData.staticUser[0].password,
          phone: mockData.staticUser[0].phone
        })
        .end((error, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  describe('When a user hits the route POST /api/user/signin/', () => {
    it('login to a user account and responds with status 200 when supplied valid parameters',
    (done) => {
      chai.request(app)
      .post('/api/user/signin/')
      .type('form')
      .send({
        username: mockData.staticUser[0].username,
        password: mockData.staticUser[0].password
      })
      .end((error, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Authentication successful');
        done();
      });
    });
    it(' login to a user account with email as username',
    (done) => {
      chai.request(app)
      .post('/api/user/signin/')
      .type('form')
      .send({
        username: mockData.staticUser[0].email,
        password: mockData.staticUser[0].password
      })
      .end((error, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Authentication successful');
        done();
      });
    });
    it('responds with status 400 if username is ommitted',
    (done) => {
      chai.request(app)
      .post('/api/user/signin/')
      .type('form')
      .send({
        password: 'johnDoePassword2'
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.error.message.should.equal('username field cannot be empty');
        done();
      });
    });
    it('responds with status 400 if password is ommitted',
    (done) => {
      chai.request(app)
      .post('/api/user/signin/')
      .type('form')
      .send({
        username: mockData.staticUser[0].username,
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.error.message.should.equal('password field cannot be empty');
        done();
      });
    });
    it('responds with status 400 if username field is empty',
    (done) => {
      chai.request(app)
      .post('/api/user/signin/')
      .type('form')
      .send({
        username: '  ',
        password: mockData.staticUser[0].password
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.error.message.should.equal('username field cannot be empty');
        done();
      });
    });
    it('responds with status 400 if password field is empty',
    (done) => {
      chai.request(app)
      .post('/api/user/signin/')
      .type('form')
      .send({
        username: mockData.staticUser[0].username,
        password: '  '
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.error.message.should.equal('password field cannot be empty');
        done();
      });
    });
    it('responds with status 404 if username does not exist',
    (done) => {
      chai.request(app)
      .post('/api/user/signin/')
      .type('form')
      .send({
        username: mockData.staticUser[1].username,
        password: mockData.staticUser[1].password
      })
      .end((error, res) => {
        res.should.have.status(404);
        res.body.error.message.should.equal
        ('Authentication failed. Username is incorrect or does not exist');
        done();
      });
    });
    it('responds with status 404 if email does not exist',
    (done) => {
      chai.request(app)
      .post('/api/user/signin/')
      .type('form')
      .send({
        username: mockData.staticUser[1].email,
        password: mockData.staticUser[1].password
      })
      .end((error, res) => {
        res.should.have.status(404);
        res.body.error.message.should.equal
        ('Authentication failed. Email is incorrect or does not exist');
        done();
      });
    });
    it('responds with status 401 if password is incorrect',
    (done) => {
      chai.request(app)
      .post('/api/user/signin/')
      .type('form')
      .send({
        username: mockData.staticUser[0].username,
        password: mockData.staticUser[1].password
      })
      .end((error, res) => {
        res.should.have.status(401);
        res.body.error.message.should.equal
        ('Authentication failed. Incorrect password');
        done();
      });
    });
  });

  describe('When a user hits the route POST /api/user/request-password/', () => {
    it('requests a new password and responds with status 200 when supplied valid parameters',
    (done) => {
      chai.request(app)
        .post('/api/user/request-password')
        .type('form')
        .send({
          email: mockData.staticUser[0].email
        })
        .end((err, res) => {
          res.should.have.status(200);
          hash = res.body.hash;
          done();
        });
    });

    // it('responds with status 200 when request is remade', (done) => {
    //   chai.request(app)
    //     .post('/api/user/request-password')
    //     .type('form')
    //     .send({
    //       email: mockData.staticUser[0].email
    //     })
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.message.should.equal('Request success');
    //       hash = res.body.hash;
    //       done();
    //     });
    // });
    it('responds with status 400 if email field is omitted', (done) => {
      chai.request(app)
        .post('/api/user/request-password')
        .type('form')
        .send({
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('Your postit associated email is required');
          done();
        });
    });
    it('responds with status 400 if email field is empty', (done) => {
      chai.request(app)
        .post('/api/user/request-password')
        .type('form')
        .send({
          email: '  '
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('Your postit associated email is required');
          done();
        });
    });
    it('responds with status 400 if email is invalid', (done) => {
      chai.request(app)
        .post('/api/user/request-password')
        .type('form')
        .send({
          email: mockData.staticUser[3].email
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('Enter a valid email');
          done();
        });
    });
    it('responds with status 404 if email does not exist',
    (done) => {
      chai.request(app)
        .post('/api/user/request-password')
        .type('form')
        .send({
          email: mockData.staticUser[1].email
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.message.should.equal('We do not have this email in our record');
          done();
        });
    });
  });
  describe('When a user hits the route POST /api/user/reset-password/:hash', () => {
    it('responds with status 401 if reset token is not supplied', (done) => {
      chai.request(app)
        .post(`/api/user/reset-password/${mockData.emptyString}`)
        .type('form')
        .send({
          password: mockData.staticUser[0].password
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('responds with status 400 if password field is omitted', (done) => {
      chai.request(app)
        .post(`/api/user/reset-password/${hash}`)
        .type('form')
        .send({
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('Password field is required');
          done();
        });
    });
    it('responds with status 400 if password field is empty', (done) => {
      chai.request(app)
        .post(`/api/user/reset-password/${hash}`)
        .type('form')
        .send({
          password: '  '
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equal('Password field is required');
          done();
        });
    });
    it('responds with status 404 if unrecognised reset token is supplied', (done) => {
      chai.request(app)
        .post(`/api/user/reset-password/${mockData.string}`)
        .type('form')
        .send({
          password: mockData.staticUser[0].password
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.message.should.equal
          ('The provided token does not exist or has been used')
          done();
        });
    });
    it('responds with status 200 if valid parameters are supplied', (done) => {
      chai.request(app)
        .post(`/api/user/reset-password/${hash}`)
        .type('form')
        .send({
          password: mockData.staticUser[0].password
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Password Reset Successful');
          done();
        });
    });
    it('responds with status 404 if hash token has been used or does not exist', (done) => {
      chai.request(app)
        .post(`/api/user/reset-password/${hash}`)
        .type('form')
        .send({
          password: mockData.staticUser[0].password
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.message.should.equal
          ('The provided token does not exist or has been used');
          done();
        });
    });
  });

  describe('When a user hits the route GET /api/search/:groupname/:searchTerm/:page', () => {
    it('responds with status 200 if all parameters are provided', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: mockData.staticUser[2].username,
          email: mockData.staticUser[2].email,
          password: mockData.staticUser[2].password,
          phone: mockData.staticUser[2].phone
        })
        .end(() => {
          chai.request(app)
          .post('/api/create-group/')
          .set('x-access-token', token)
          .type('form')
          .send(mockData.staticGroups[0])
          .end(() => {
            chai.request(app)
            .post(`/api/groups/${mockData.staticGroups[0].groupname}/add-member/`)
            .type('form')
            .set('x-access-token', token)
            .send({
              username: mockData.staticUser[2].username,
            })
            .end(() => {
              const { groupname } = mockData.staticGroups[0];
              chai.request(app)
              .get(`/api/search/${groupname}/mockData.staticUser[2].username/0`)
              .set('x-access-token', token)
              .type('form')
              .send()
              .end((err, res) => {
                res.should.have.status(200);
                done();
              });
            });
          });
        });
    });
    it('responds with status 401 if user no access token is provided', (done) => {
      const { groupname } = mockData.staticGroups[0];
      chai.request(app)
      .get(`/api/search/${groupname}/mockData.username/0`)
      .set('x-access-token', '')
      .type('form')
      .send()
      .end((err, res) => {
        res.should.have.status(401);
        res.body.error.message.should.equal('Unauthorized: No access token provided');
        done();
      });
    });
    it('responds with status 401 if access token is invalid or expired', (done) => {
      const { groupname } = mockData.staticGroups[0];
      chai.request(app)
      .get(`/api/search/${groupname}/mockData.username/0`)
      .set('x-access-token', '123456')
      .type('form')
      .send()
      .end((err, res) => {
        res.should.have.status(401);
        res.body.error.message.should.equal('Authentication failed. Invalid access token');
        done();
      });
    });
    it('does not return users who are already in a group', (done) => {
      const { groupname } = mockData.staticGroups[0];
      const { username } = mockData;
      chai.request(app)
      .get(`/api/search/${groupname}/${username}/0`)
      .set('x-access-token', token)
      .type('form')
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal(`No search result for ${username}`);
        done();
      });
    });
    it('responds with status 200 for all search result', (done) => {
      const { groupname } = mockData.staticGroups[0];
      const { username } = mockData.staticUser[2];
      chai.request(app)
      .get(`/api/search/${groupname}/${username}/0`)
      .set('x-access-token', token)
      .type('form')
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
    it('responds with status 400 if groupname is not supplied', (done) => {
      const { username } = mockData.staticUser[0];
      chai.request(app)
      .get(`/api/search/${mockData.emptyString}/${username}/0`)
      .set('x-access-token', token)
      .type('form')
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.message.should.equal('Bad request, groupname is required');
        done();
      });
    });
    it('responds with status 400 if searchTerm is not supplied', (done) => {
      const { groupname } = mockData.staticGroups[0];
      chai.request(app)
      .get(`/api/search/${groupname}/${mockData.emptyString}/0`)
      .set('x-access-token', token)
      .type('form')
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.message.should.equal('Please specify a search term');
        done();
      });
    });
    it('responds with status 404 if group does not exist', (done) => {
      const groupname = mockData.staticGroups[1].groupname;
      chai.request(app)
      .get(`/api/search/${groupname}/${mockData.staticUser[2].username}/0`)
      .set('x-access-token', token)
      .type('form')
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.error.message.should.equal
        (`${groupname} does not exist on PostIt`);
        done();
      });
    });
    it('responds with status 400 if search page is negative', (done) => {
      const { groupname } = mockData.staticGroups[0];
      const { username } = mockData.staticUser[2];
      chai.request(app)
      .get(`/api/search/${groupname}/${username}/-1`)
      .set('x-access-token', token)
      .type('form')
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.message.should.equal('Page must be a positive integer');
        done();
      });
    });
  });
});