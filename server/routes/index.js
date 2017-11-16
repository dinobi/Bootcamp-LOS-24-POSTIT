import controllers from '../controllers';
import { authUser } from '../helpers/authService';
import { verifyUser, verifyGroup } from '../helpers/verify';

export default (app) => {
  app.all('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the PostIT API',
  }));
  // API routes for users to create an account
  app.post('/api/user/signup/', controllers.user.createNewUser);

  // Api route for user to login to an account
  app.post('/api/user/signin/', controllers.user.authUser);

  // Api route for user to login to an account
  app.post('/api/user/request-password/',
  controllers.user.requestPassword);

  // Api route for users to reset password
  app.post('/api/user/reset-password/:hash',
  controllers.user.resetPassword);

  // Middleware to protect the following API routes
  app.use(authUser);

  // API route to get list of all users
  app.get('/api/users/', controllers.user.fetchUsers);

  // API route to perform postit search
  app.get('/api/search/:groupname/:searchTerm/:page', controllers.user.search);

  // API route that allow users create broadcast groups
  app.post('/api/create-group/',
  controllers.group.create);

  // API route that allow users delete a broadcast group
  app.post('/api/groups/delete-group/',
  controllers.group.delete);

  // API route to get list of all groups
  app.get('/api/groups/', controllers.group.fetchAllGroups);

  // API route to get list of group a user belongs to
  app.get('/api/groups/me/', controllers.group.fetchMyGroups);

  // API route that allows users to add group members
  app.post('/api/groups/:groupname/add-member/',
  controllers.group.addMember);

  // API route that allows users to remove group members
  app.post('/api/groups/:groupname/remove-member/',
  controllers.group.removeMember);

  // API route to get list of all users in a group
  app.get('/api/groups/:groupname/members/',
  controllers.group.fetchMembers);

  // API route that allows a logged in user post messages to created groups
  app.post('/api/groups/:groupname/send-message/', verifyGroup,
  controllers.message.createMessage);

  // API route that allows a logged in user retrieve messages from group
  app.get('/api/groups/:groupname/show-messages/',
  controllers.message.fetchMessages);

  // API route to serve error page
  app.all('/*', (req, res) => res.status(404).send({
    error: 'Resource not found',
    status: 404
  }));
};
