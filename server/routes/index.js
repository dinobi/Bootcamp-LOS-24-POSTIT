import jwt from 'jsonwebtoken';
import controllers from '../controllers';

export default (app) => {
  app.all('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the PostIT API',
  }));
  // API routes for users to create accounts and login to the application
  app.post('/api/user/signup/', controllers.user.create);
  app.post('/api/user/signin/', controllers.user.auth);

  // API route to get list of all users
  app.get('/api/users/', controllers.user.fetch);

  // API route that allow users create broadcast groups
  app.post('/api/groups/', controllers.group.create);

  // API route to get list of all groups
  app.get('/api/groups/', controllers.group.fetch);
};
