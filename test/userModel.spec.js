import chai from 'chai';
import models from '../server/models';
import mockData from '../client/src/spec/mocks/mockData';

const expect = chai.expect;

describe('User Model', () => {
  const newUser = {
    username: mockData.username,
    email: mockData.email,
    phone: mockData.staticUser[3].phone,
    password: mockData.staticUser[4].password
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
      email: mockData.staticUser[3].email,
      password: mockData.staticUser[3].password,
      phone: mockData.staticUser[3].phone
    };
    models.User.create(newUser)
      .catch((error) => {
        expect(error.errors[0].message).to.equal('username cannot be null');
        // expect(error.errors[0].message).to.equal('User.username cannot be null');
        done();
      });
  });

  it('should fail if email is not provided', (done) => {
    const newUser = {
      username: mockData.staticUser[2].username,
      password: mockData.staticUser[2].password,
      phone: mockData.staticUser[2].phone
    };
    models.User.create(newUser)
      .catch((error) => {
        expect(error.errors[0].message).to.equal('email cannot be null');
        // expect(error.errors[0].message).to.equal('User.email cannot be null');
        done();
      });
  });

  it('should fail if phone is not provided', (done) => {
    const newUser = {
      username: mockData.staticUser[2].username,
      email: mockData.staticUser[2].email,
      password: mockData.staticUser[2].password,
    };
    models.User.create(newUser)
      .catch((error) => {
        expect(error.errors[0].message).to.equal('phone cannot be null');
        // expect(error.errors[0].message).to.equal('User.phone cannot be null');
        done();
      });
  });

  it('should fail if password is not provided', (done) => {
    const newUser = {
      username: mockData.staticUser[2].username,
      email: mockData.staticUser[2].email,
      phone: mockData.staticUser[2].phone
    };
    models.User.create(newUser)
      .catch((error) => {
        expect(error.errors[0].message).to.equal('password cannot be null');
        // expect(error.errors[0].message).to.equal('User.password cannot be null');
        done();
      });
  });

  it('should fail if email is invalid', (done) => {
    const newUser = {
      username: mockData.staticUser[2].username,
      email: mockData.staticUser[3].email,
      phone: mockData.staticUser[2].phone,
      password: mockData.staticUser[0].password
    };
    models.User.create(newUser)
      .catch((error) => {
        expect(error.errors[0].message).to
          .equal('Validation isEmail on email failed');
        done();
      });
  });
  it('should fail if phone is invalid', (done) => {
    const newUser = {
      username: mockData.staticUser[2].username,
      email: mockData.staticUser[2].email,
      phone: mockData.staticUser[4].phone,
      password: mockData.staticUser[0].password
    };
    models.User.create(newUser)
      .catch((error) => {
        expect(error.errors[0].message).to
          .equal('Validation not on phone failed');
        done();
      });
  });
  it('should fail if username already exists', (done) => {
    const newUser = {
      username: mockData.staticUser[0].username,
      email: mockData.staticUser[2].email,
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
      username: mockData.staticUser[2].email,
      email: mockData.staticUser[0].email,
      phone: mockData.staticUser[2].phone,
      password: mockData.staticUser[2].password
    };
    models.User.create(newUser)
      .catch((error) => {
        expect(error.errors[0].message).to
          .equal('email must be unique');
        done();
      });
  });
});
