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
  });
});
