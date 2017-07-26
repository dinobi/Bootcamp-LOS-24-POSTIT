import jwt from 'jsonwebtoken';
import controllers from '../controllers';

export default (app) => {
  app.all('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the PostIT API',
  }));
  // API routes for users to create an account
  app.post('/api/user/signup/', controllers.user.create);

  // Api route for user to login to an account
  app.post('/api/user/signin/', controllers.user.auth);

  // Middleware to protect the following API access
  let token;
  app.use((req, res, next) => {
    token = req.headers['x-access-token'];
    jwt.verify(token, 'PrivateKey', (err, decoded) => {
      if (err) {
        res.status(401)
        .send({ message: 'Authentication failed. Invalid access token' });
        return;
      }
      // If valid, save request for use on all routes
      req.decoded = decoded;
      next();
    });
  });

  // API route to get list of all users
  app.get('/api/users/', controllers.user.fetch);

  // API route that allow users create broadcast groups
  app.post('/api/create-group/', controllers.group.create);

  // API route to get list of all groups
  app.get('/api/show-groups/', controllers.group.fetch);

  // API route that allows users add other user to a group
  app.post('/api/groups/:groupname/user/', controllers.group.addMember);

  // API route to get list of all users in group
  app.get('/api/groups/:groupname/users/', controllers.group.fetchMembers);  

  // API route that allows a logged in user post messages to created groups
  app.post('/api/groups/:groupname/send-message/', controllers.group.createMessage);

  // API route that allows a logged in user retrieve messages from group
  app.get('/api/groups/:groupname/show-messages/', controllers.group.fetchMessages);
};
