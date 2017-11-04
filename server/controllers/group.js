import models from '../models';
import lengthCheck from '../helpers/lengthCheck';

export default {
  create(req, res) {
    let groupname = req.body.groupname;
    let description = req.body.description;
    if (!groupname || groupname.trim() === '') {
      return res.status(400).send({
        error: { message: 'A group name is required' }
      });
    }
    if (!description || description.trim() === '') {
      return res.status(400).send({
        error: { message: 'A group description is required' }
      });
    }
    groupname = req.body.groupname.toLowerCase();
    description = req.body.description;
    if (lengthCheck(res, groupname, description) !== 'validLength') {
      return;
    }
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
            error: { message: `${groupname} already exist` }
          });
        } else {
          res.status(500).send({ error: error.message, status: 500 });
        }
      });
  },
  // Delete Group
  delete(req, res) {
    let groupname = req.body.groupname;
    if (!groupname || groupname.trim() === '') {
      return res.status(400).send({
        error: { message: 'Specify the group you want to archive' }
      });
    }
    groupname = req.body.groupname.toLowerCase();
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
    const groupname = req.params.groupname;
    const username = req.body.username;
    if (!groupname || groupname.trim() === '') {
      res.status(400).send({
        error: {
          message: 'Bad request, go to group you want to add member'
        }
      });
      return;
    }
    if (!username || username.trim() === '') {
      res.status(400).send({
        error: {
          message: 'Bad request, username is required'
        }
      });
      return;
    }
    return models.Group
      .findOne({ where: { groupname } })
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
          .findOne({ where: { username } })
          .then((user) => {
            // check if the username belongs to a registered user
            if (!user) {
              return res.status(404).send({
                error: {
                  message: 'User not found. User has no PostIt account'
                }
              });
            }
            return models.UserGroup
              .findOne({
                where: {
                  username,
                  groupname
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
                  username,
                  groupname
                })
                .then(member =>
                  res.status(201).send({
                    member,
                    message:
                    `${username} was added to ${groupname}`
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
    const username = req.body.username;
    const groupname = req.params.groupname;
    if (!groupname || groupname.trim() === '') {
      res.status(400).send({
        error: {
          message: 'Bad request, go to group you want to remove member'
        }
      });
      return;
    }
    if (!username || username.trim() === '') {
      res.status(400).send({
        error: {
          message: 'Bad request, username is required'
        }
      });
      return;
    }
    return models.Group
      .findOne({ where: { groupname } })
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
          .findOne({ where: { username } })
          .then((user) => {
            // check if the username belongs to a registered user
            if (!user) {
              return res.status(404).send({
                error: {
                  message: 'User not found. User has no PostIt account'
                }
              });
            }
            return models.UserGroup
              .findOne({
                where: {
                  username,
                  groupname
                }
              })
              .then((result) => {
                if (result !== null) {
                  models.UserGroup.destroy({
                    where: { username, groupname }
                  });
                  return res.status(200).send({
                    username,
                    message:
                    `${username}
                    was successfully removed from
                    ${groupname}`
                  });
                }
                return res.status(404).send({
                  error: {
                    message: `No such user in ${groupname}`
                  }
                });
              }).catch(error =>
                res.status(500).send({ error: error.message, status: 500 }));
          }).catch(error =>
            res.status(500).send({ error: error.message, status: 500 }));
      });
  },
  // Get List of group members
  fetchMembers(req, res) {
    const groupname = req.params.groupname;
    if (!groupname || groupname.trim() === '') {
      res.status(400).send({
        error: {
          message: 'Bad request, go to group you want to view its member'
        }
      });
      return;
    }
    return models.Group.findOne({ where: { groupname } })
      .then((group) => {
        if (!group) {
          res.status(400).send({
            error: { message: `Group - ${groupname} does not exist` }
          });
        } else {
          return models.UserGroup
          .findAll({ where: { groupname } })
          .then((result) => {
            if (result.length === 0) {
              res.status(204).send({
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
