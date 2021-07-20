const router = require('express').Router();
const UserController = require('../controllers/UserController');
const UserMiddleware = require('../controllers/middleware/UsersMiddleware');

router.get('/users/check-email/:token', 
  UserMiddleware.setUser,
  UserController.updateCheckedEmail
);

module.exports = router;