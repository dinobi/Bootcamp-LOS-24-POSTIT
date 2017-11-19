import chai from 'chai';
import models from '../server/models';
import mockData from '../client/src/spec/mocks/mockData';

const expect = chai.expect;

describe('User Model', () => {
  const newUser = {
    username: mockData.username,
    email: mockData.randomUser.email,
    phone: mockData.staticUser[0].phone,
    password: mockData.string
  };
  it('should create new user', (done) => {
    models.User.create(newUser)
    .then((user) => {
      expect(user.username).to.equal(newUser.username);
      expect(user.email).to.equal(newUser.email);
      done();
    });
  });

  it('should fail if username is not provided', (done) => {
    const newUser = {
      email: mockData.randomUser.email,
      password: mockData.randomPassword,
      phone: mockData.staticUser[0].phone
    };
    models.User.create(newUser)
    .catch((error) => {
      expect(error.errors[0].message).to.equal('User.username cannot be null');
      done();
    });
  });

  it('should fail if email is not provided', (done) => {
    const newUser = {
      username: mockData.randomUser.username,
      password: mockData.randomPassword,
      phone: mockData.staticUser[0].phone
    };
    models.User.create(newUser)
    .catch((error) => {
      expect(error.errors[0].message).to.equal('User.email cannot be null');
      done();
    });
  });

  it('should fail if phone is not provided', (done) => {
    const newUser = {
      username: mockData.randomUser.username,
      email: mockData.randomUser.email,
      password: mockData.randomUser.password
    };
    models.User.create(newUser)
    .catch((error) => {
      expect(error.errors[0].message).to.equal('User.phone cannot be null');
      done();
    });
  });

  it('should fail if password is not provided', (done) => {
    const newUser = {
      username: mockData.randomUser.username,
      email: mockData.randomUser.email,
      phone: mockData.staticUser[0].phone
    };
    models.User.create(newUser)
    .catch((error) => {
      expect(error.errors[0].message).to.equal('User.password cannot be null');
      done();
    });
  });

  it('should fail if email is invalid', (done) => {
    const newUser = {
      username: mockData.username,
      email: mockData.string,
      phone: mockData.staticUser[0].phone,
      password: mockData.staticUser[0].password
    };
    models.User.create(newUser)
    .catch((error) => {
      expect(error.errors[0].message).to
      .equal('Validation isEmail on email failed');
      done();
    });
  });
  it('should fail if username already exists', (done) => {
    const newUser = {
      username: mockData.staticUser[0].username,
      email: mockData.randomUser.email,
      phone: mockData.staticUser[0].phone,
      password: mockData.staticUser[0].password
    };
    models.User.create(newUser)
    .catch((error) => {
      expect(error.errors[0].message).to
      .equal('username must be unique');
      done();
    });
  });
  it('should fail if email already exists', (done) => {
    const newUser = {
      username: mockData.string,
      email: mockData.staticUser[0].email,
      phone: mockData.staticUser[0].phone,
      password: mockData.randomUser.password
    };
    models.User.create(newUser)
    .catch((error) => {
      expect(error.errors[0].message).to
      .equal('email must be unique');
      done();
    });
  });
});
