import controllers from '../controllers';

export default (app) => {
  app.all('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the PostIT API',
  }));
  // API routes for users to create an account
  app.post('/api/user/signup/', controllers.user.create);

  //Api route for user to login to an account
  app.post('/api/user/signin/', controllers.user.auth);

  // API route to get list of all users
  app.get('/api/users/', controllers.user.fetch);

  // API route that allow users create broadcast groups
  app.post('/api/user/create-group/', controllers.group.create);

  // API route to get list of all groups
  app.get('/api/show-groups/', controllers.group.fetch);

  // API route to get list of all users in group
  app.get('/api/groups/:id', controllers.group.fetchMembers);

  // API route that allows users add other user to a group
  app.post('/api/groups/:id/user/', controllers.usergroup.addMember);

  // API route that allows a logged in user post messages to created groups
  app.post('/api/groups/:id/send-message/', controllers.message.create);

  // API route that allows a logged in user retrieve messages from group
  app.get('/api/groups/:id/show-messages/', controllers.group.messages);
};
