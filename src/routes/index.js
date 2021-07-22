const bodyParser = require('body-parser');
const userRoute = require('./userRoute');
const postRoute = require('./postRoute');
const authRoute = require('./authRoute');
const emailsRoute = require('./emailsRoute');
const ErrorMiddleware = 
require('../controllers/middleware/ErrorMiddleware');
const SerializeMiddleware = 
require('../controllers/middleware/SerializeMiddleware');

module.exports = app => {
  const prefix = '/api/v1';

  app.use(bodyParser.json());

  app.use(SerializeMiddleware.json);

  app.use(`${prefix}`, authRoute);

  app.get(`${prefix}`, (req, res) => {
    res.json('index....');
  });
  
  //check-email after create user
  app.use(`${prefix}`, emailsRoute);

  app.use(`${prefix}/users`, userRoute);

  app.use(`${prefix}/posts`, postRoute);

  app.use(ErrorMiddleware.processing);
}