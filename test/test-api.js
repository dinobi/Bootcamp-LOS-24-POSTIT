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

describe('PostIt Tests: ', () => {
  describe('Creating account: ', () => {
    it('POST /api/user/signup/ creates a new user', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'fistname',
          lastname: 'lastname',
          username: 'username',
          email: 'test@user.com',
          password: 'password',
          phone: '08032952998'
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it('creates a unique username per user', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          firstname: 'fistname',
        })
        .end((err, res) => {
          res.should.have.status(400);
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
        .end((err, res) => {
          res.should.have.status(400);
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
        .end((err, res) => {
          res.should.have.status(400);
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
        .end((err, res) => {
          res.should.have.status(400);
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
        .end((err, res) => {
          res.should.have.status(400);
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
        .end((err, res) => {
          res.should.have.status(400);
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
        .end((err, res) => {
          res.should.have.status(400);
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
        .end((err, res) => {
          res.should.have.status(400);
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
        .end((err, res) => {
          res.should.have.status(400);
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
        .end((err, res) => {
          res.should.have.status(400);
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
        .end((err, res) => {
          res.should.have.status(400);
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
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('considers phone numbers up to 11 as valid', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          phone: '08032952998',
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it('considers phone numbers up to 13 as valid', (done) => {
      chai.request(app)
        .post('/api/user/signup/')
        .type('form')
        .send({
          phone: '2348032952998',
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
});
