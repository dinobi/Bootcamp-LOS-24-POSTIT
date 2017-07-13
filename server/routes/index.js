import jwt from 'jsonwebtoken';
import controllers from '../controllers';

export default (app) => {
  // API routes for users to create accounts and login to the application
  app.post('/api/user/signup/', controllers.user.create);
  app.post('/api/user/signin/', controllers.user.auth);
  let token;
  app.use((req, res, next) => {
    token = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token, 'PrivateKey', (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: 'Not authenticated, invalid access token'
        });
        return;
      }
      // Working token, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  });

  app.all('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the PostIT API',
  }));

  // API route to get list of all users
  app.get('/api/users/', controllers.user.fetch);

  // API route that allow users create broadcast groups
  app.post('/api/groups/', controllers.group.create);

  // API route that allow users add other users to groups
  app.post('/api/groups/:id/user/', controllers.usergroup.addMember);

  // API route that allows a logged in user post messages to created groups
  app.post('/api/groups/:id/message/', controllers.message.create);

  // API route that allows a logged in user retrieve messages from group
  app.get('/api/groups/:id/fetchMessages/', controllers.group.messages);

  // API route to get list of all groups
  app.get('/api/groups/', controllers.group.fetch);

  // API route to get list of all users in a group
  app.get('/api/group/:id', controllers.group.fetchMembers);
};
