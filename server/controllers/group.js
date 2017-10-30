import models from '../models';

export default {
  create(req, res) {
    if (!req.body.groupname || req.body.groupname.trim() === '') {
      return res.status(400).send({
        error: { message: 'A group name is required' }
      });
    }
    if (!req.body.description || req.body.description.trim() === '') {
      return res.status(400).send({
        error: { message: 'A group description is required' }
      });
    }
    const groupname = req.body.groupname.toLowerCase();
    const description = req.body.description;
    return models.Group
      .create({
        groupname,
        description,
      })
      .then((group) => {
        const user = req.decoded.data.username;
        models.UserGroup
        .create({
          username: user,
          groupname,
          description
        })
        .then(res.status(201).send({
          groupData: {
            groupname,
            description
          },
          message: `${group.groupname} was created successfully`,
        }));
      })
      .catch((error) => {
        if (error.errors[0].message === 'groupname must be unique') {
          res.status(409).send({
            error: { message: `${req.body.groupname} Already Exist` }
          });
        } else {
          res.status(500).send({ error: error.message, status: 500 });
        }
      });
  },
  // Delete Group
  delete(req, res) {
    if (!req.body.groupname || req.body.groupname.trim() === '') {
      return res.status(400).send({
        error: { message: 'Specify the group you want to archive' }
      });
    }
    const groupname = req.body.groupname.toLowerCase();
    models.Group
      .findOne({ where: { groupname } })
      .then((group) => {
        if (!group) {
          return res.status(404).send({
            error: {
              message: `${groupname} does not exist`
            }
          });
        }
        const user = req.decoded.data.username;
        models.UserGroup
          .findOne({ where: { groupname }, attributes: ['username'] })
          .then((result) => {
            if (result.dataValues.username !== user) {
              return res.status(403).send({
                error: {
                  message: `You do not have permission to delete ${groupname}`
                }
              });
            }
            models.Group.destroy({ where: { groupname } });
            models.UserGroup.destroy({ where: { groupname } });
            return res.status(200).send({
              group,
              message: `${groupname} has been archived`
            });
          }).catch((error) => {
            res.status(500).send({ error: error.message, status: 500 });
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
          res.status(204).send({ message: 'You have not created any group' });
        } else {
          return res.status(200).send(groups);
        }
      })
      .catch((error) => {
        res.status(500).send({
          error: error.message, status: 500
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
          res.status(204).send({ message: 'You have no group yet' });
        } else {
          return res.status(200).send(groups);
        }
      }).catch((error) => {
        res.status(500).send({ error: error.message, status: 500 });
      });
  },
  // Add member to group
  addMember(req, res) {
    if (!req.body.username || req.body.username.trim() === '') {
      res.status(400).send({
        error: {
          message: 'Bad request, username is required'
        }
      });
      return;
    }
    if (!req.params.groupname || req.params.groupname.trim() === '') {
      res.status(400).send({
        error: {
          message: 'Bad request, go to group you want to edit'
        }
      });
      return;
    }
    return models.Group
      .findOne({ where: { groupname: req.params.groupname } })
      .then((group) => {
        // check if the group exists
        if (!group) {
          return res.status(404).send({
            error: {
              message: 'Group not found or has not been created'
            }
          });
        }
        return models.User
          .findOne({ where: { username: req.body.username } })
          .then((user) => {
            // check if the username belongs to a registered user
            if (!user) {
              return res.status(404).send({
                error: {
                  message: 'Username not found. User has no PostIt account.'
                }
              });
            }
            return models.UserGroup
              .findOne({
                where: {
                  username: req.body.username,
                  groupname: req.params.groupname
                }
              })
              .then((result) => {
                if (result !== null) {
                  return res.status(409).send({
                    error: {
                      message: 'User already belong to group'
                    }
                  });
                }
                models.UserGroup.create({
                  username: req.body.username,
                  groupname: req.params.groupname
                })
                .then(member =>
                  res.status(201).send({
                    member,
                    message:
                    `${req.body.username} was added to ${req.params.groupname}`
                  })
                )
                .catch(error =>
                  res.status(500).send({ error: error.message, status: 500 })
                );
              })
              .catch(error =>
                res.status(500).send({ error: error.message, status: 500 }));
          })
          .catch(error =>
            res.status(500).send({ error: error.message, status: 500 }));
      });
  },
  // remove member from group
  removeMember(req, res) {
    if (!req.body.username || req.body.username.trim() === '') {
      res.status(400).send({
        error: {
          message: 'Bad request, username is required'
        }
      });
      return;
    }
    if (!req.params.groupname || req.params.groupname.trim() === '') {
      res.status(400).send({
        error: {
          message: 'Bad request, go to group you want to edit'
        }
      });
      return;
    }
    return models.Group
      .findOne({ where: { groupname: req.params.groupname } })
      .then((group) => {
        // check if the group exists
        if (!group) {
          return res.status(404).send({
            error: {
              message: 'Group not found or has not been created'
            }
          });
        }
        return models.User
          .findOne({ where: { username: req.body.username } })
          .then((user) => {
            // check if the username belongs to a registered user
            if (!user) {
              return res.status(404).send({
                error: {
                  message: 'Username not found. User has no PostIt account.'
                }
              });
            }
            return models.UserGroup
              .findOne({
                where: {
                  username: req.body.username,
                  groupname: req.params.groupname
                }
              })
              .then((result) => {
                if (result !== null) {
                  models.UserGroup.destroy({
                    where: {
                      username: req.body.username,
                      groupname: req.params.groupname }
                  });
                  return res.status(200).send({
                    username: req.body.username,
                    message:
                    `${req.body.username}
                    was successfully removed from
                    ${req.params.groupname}`
                  });
                }
                return res.status(404).send({
                  message: `No such user in ${req.params.groupname}`
                });
              }).catch(error =>
                res.status(500).send({ error: error.message, status: 500 }));
          }).catch(error =>
            res.status(500).send({ error: error.message, status: 500 }));
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
              res.status(201).send({
                message: 'You have not added any members'
              });
            } else {
              res.status(200).send(result);
            }
          });
        }
      }).catch(error =>
        res.status(500).send({ error: error.message, status: 500 }));
  }
};
