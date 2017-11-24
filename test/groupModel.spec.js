import chai from 'chai';
import models from '../server/models';
import mockData from '../client/src/spec/mocks/mockData';

const expect = chai.expect;

describe('Group Model', () => {
  it('should create new group', (done) => {
    const newGroup = mockData.staticGroups[3];
    models.Group.create(newGroup)
      .then((group) => {
        expect(group.name).to.equal(newGroup.name);
        done();
      });
  });

  it('should fail if groupname is not provided', (done) => {
    const newGroup = {
      description: mockData.staticGroups[0].description,
    };
    models.Group.create(newGroup)
      .catch((error) => {
        expect(error.errors[0].message).to
          //  .equal('groupname cannot be null');
          .equal('Group.groupname cannot be null');
        done();
      });
  });
});
