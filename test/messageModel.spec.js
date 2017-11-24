import chai from 'chai';
import models from '../server/models';
import mockData from '../client/src/spec/mocks/mockData';

const expect = chai.expect;

describe('Message Model', () => {
  it('should create new message', (done) => {
    const newMessage = {
      message: mockData.longString[0],
      priority: 'normal',
      fromUser: mockData.staticUser[0].username,
      toGroup: mockData.staticGroups[0].groupname
    };
    models.Message.create(newMessage)
      .then((message) => {
        expect(message.message).to.equal(newMessage.message);
        done();
      });
  });

  it('should fail if message is not given', (done) => {
    const newMessage = {
      priority: 'normal',
      fromUser: mockData.staticUser[0].username,
      toGroup: mockData.staticGroups[0].groupname
    };
    models.Message.create(newMessage)
      .catch((error) => {
        expect(error.errors[0].message).to
          .equal('message cannot be null');
        // .equal('Message.message cannot be null');
        done();
      });
  });

  it('should fail if fromUser is not given', (done) => {
    const newMessage = {
      message: mockData.longString[0],
      priority: 'normal',
      toGroup: mockData.staticGroups[0].groupname
    };
    models.Message.create(newMessage)
      .catch((error) => {
        expect(error.errors[0].message).to
          .equal('fromUser cannot be null');
        // .equal('Message.fromUser cannot be null');
        done();
      });
  });

  it('should fail if toGroup is not given', (done) => {
    const newMessage = {
      message: mockData.longString[0],
      priority: 'normal',
      fromUser: mockData.staticUser[0].username
    };
    models.Message.create(newMessage)
      .catch((error) => {
        expect(error.errors[0].message).to
          .equal('toGroup cannot be null');
        // .equal('Message.toGroup cannot be null');
        done();
      });
  });

  it('should fail if wrong priority is given', (done) => {
    const newMessage = {
      message: mockData.longString[0],
      priority: 'important',
      fromUser: mockData.staticUser[0].username,
      toGroup: mockData.staticGroups[0].groupname
    };
    models.Message.create(newMessage)
      .catch((error) => {
        expect(error.errors[0].message).to
          .equal('Validation isIn on priority failed');
        done();
      });
  });
});
