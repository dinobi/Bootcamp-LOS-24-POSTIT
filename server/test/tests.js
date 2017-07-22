import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import models from '../models';

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
  describe('Creating data: ', () => {
    it('POST /api/users/signup/ creates a new user', (done) => {
      chai.request(app)
        .post('/api/users/signup/')
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
          res.body.email.should.equal('test@user.com');
          res.should.have.status(201);
          res.should.have.status(400);
          done();
        });
    });
    it('POST /api/users/signin/ logs a user in', (done) => {
      chai.request(app)
        .post('/api/users/signin/')
        .type('form')
        .send({
          password: 'password',
          username: 'username'
        })
        .end((err, res) => {
          res.should.have.status(202);
          done();
        });
    });
    it('POST /api/groups/ creates new group', (done) => {
      chai.request(app)
        .post('/api/groups/')
        .type('form')
        .send({
          name: 'MyGroup',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.name.should.equal('MyGroup');
          done();
        });
    });
  });
});
