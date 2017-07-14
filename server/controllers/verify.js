
let token;
app.use((req, res, next) => {
  token = req.body.token || req.query.token || req.headers['x-access-token'];
     jwt.verify(token, 'PrivateKey', (err, decoded) => {
       if (err) {
         res.status(401).send({
           message: 'You are not authenticated, invalid access token'
         });
       }
       // Working token, save to request for use in other routes
       req.decoded = decoded;
       next();
     });
});
