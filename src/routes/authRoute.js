const router = require('express').Router({
  mergeParams: true
});
const AuthController = require('../controllers/auth/AuthController');
const AuthMiddleware = require('../controllers/middleware/AuthMiddleware');

router.post('/login',
  AuthMiddleware.local,
  AuthController.login
);

router.get('/logout', 
  AuthMiddleware.bearer,
  AuthController.logout
);

module.exports = router;