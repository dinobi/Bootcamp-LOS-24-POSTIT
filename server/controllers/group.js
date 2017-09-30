import models from '../models';

export default {
  create(req, res) {
    if (!req.body.groupname || req.body.groupname.trim() === '') {
      console.log('Body at controller::::', req.body);
      return res.status(400).send({
        error: { message: 'A group name is required' }
      });
    }
    if (!req.body.description || req.body.description.trim() === '') {
      return res.status(400).send({
        error: { message: 'A group description is required' }
      });
    }
    return models.Group
      .create({
        groupname: req.body.groupname,
        description: req.body.description,
      })
      .then((group) => {
        const user = req.decoded.data.username;
        // Add user to the group
        models.UserGroup
        .create({
          username: user,
          groupname: req.body.groupname
        })
        .then(res.status(201).send({
          message: `Group - ${group.groupname}, was created successfully`,
        }));
      })
      .catch((error) => {
        if (error.errors[0].message === 'groupname must be unique') {
          console.log(error)
          res.status(400).send({
            error: { message: `Group - ${req.body.groupname}, Already Exist` }
          });
        } else {
          res.status(400).send(error);
        }
      });
  },
  delete(req, res) {
    if (!req.params.groupname || req.params.groupname.trim() === '') {
      return res.status(400).send({
        error: { message: 'Go to group you want to delete' }
      });
    }
    return models.Group
      .findOne({ where: { groupname: req.params.groupname } })
      .then((group) => {
        if (!group) {
          return res.status(200).send({
            message: `Group - ${req.params.groupname}, does not exist`
          });
        }
        models.Group.destroy({ where: { groupname: req.params.groupname } });
        return res.status(200).send({
          message: `Group - ${req.params.groupname}, has been deleted`
        });
      });
  },
  // Display all created groups on postit
  fetchAllGroups(req, res) {
    return models.Group
      .findAll({ attributes:
        ['groupname', 'description']
      })
      .then((groups) => {
        if (groups.length === 0) {
          res.status(200).send({ message: 'You have not created any group' });
        } else {
          return res.status(200).send(groups);
        }
      })
      .catch((error) => {
        res.status(400).send({
          error: { message: error }
        });
      });
  },
  // Users can see all the groups that they belong to
  fetchMyGroups(req, res) {
    const user = req.decoded.data.username;
    return models.UserGroup
      .findAll({ where: { username: user } })
      .then((groups) => {
        if (groups.length === 0) {
          res.status(200).send({ message: 'You have no group yet' });
        } else {
          return res.status(200).send(groups);
        }
      }).catch((error) => {
        res.status(500).send({ error: error.message, status: 500 });
      });
  },
  // Add/Remove member from group
  editGroup(req, res) {
    if (!req.body.username || req.body.username.trim() === '') {
      res.status(400).send({ message: 'Bad request, username is required' });
      return;
    }
    if (!req.params.groupname || req.params.groupname.trim() === '') {
      res.status(400).send({ message: 'Bad request, go to group you want to edit' });
      return;
    }
    return models.Group
      .findOne({ where: { groupname: req.params.groupname } })
      .then((group) => {
        // check if the group exists
        if (!group) {
          return res.status(404).send({
            message: 'Group not found or has not been created'
          });
        }
        return models.User
          .findOne({ where: { username: req.body.username } })
          .then((user) => {
            // check if the username belongs to a registered user
            if (!user) {
              return res.status(404).send({
                message: 'Username not found. User has no PostIt account.'
              });
            }
            return models.UserGroup
              .findOne({
                where: { username: req.body.username, groupname: req.params.groupname }
              })
              .then((result) => {
                if (result !== null) {
                  models.UserGroup.destroy({
                    where: { username: req.body.username,
                      groupname: req.params.groupname }
                  });
                  return res.status(200).send({
                    message: `${req.body.username} was successfully removed from ${req.params.groupname}`
                  });
                }
                models.UserGroup.create({
                  username: req.body.username,
                  groupname: req.params.groupname
                });
                return res.status(201).send({
                  message: `${req.body.username} was successfully added to ${req.params.groupname}`
                });
              }).catch(error => console.log('This is the error: ', error));
          }).catch(error => console.log('This is the error: ', error));
      });
  },
  // Get List of group members
  fetchMembers(req, res) {
    return models.Group.findOne({ where: { groupname: req.params.groupname } })
      .then((group) => {
        if (!group) {
          res.status(400).send({
            error: { message: `Group - ${req.params.groupname} does not exist` }
          });
        } else {
          return models.UserGroup
          .findAll({ where: { groupname: req.params.groupname } })
          .then((result) => {
            if (result.length === 0) {
              res.status(200).send({
                message: 'You have not added any members'
              });
            } else {
              res.status(200).send(result);
            }
          });
        }
      });
  }
};
