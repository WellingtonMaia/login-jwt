const bodyParser = require('body-parser');
const userRoute = require('./userRoute');
const postRoute = require('./postRoute');
const authRoute = require('./authRoute');
const AuthMiddleware = require('../controllers/middleware/AuthMiddleware');

module.exports = app => {
  const prefix = '/api/v1';

  app.use(bodyParser.json());

  app.use(`${prefix}`, authRoute);

  app.get(`${prefix}`, (req, res) => {
    res.json('index....');
  });

  //check if user is authentication
  app.use(`${prefix}`, AuthMiddleware.bearer);

  app.use(`${prefix}/users`, userRoute);

  app.use(`${prefix}/posts`, postRoute);
}