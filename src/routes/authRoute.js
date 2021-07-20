const router = require('express').Router({
  mergeParams: true
});
const AuthController = require('../controllers/auth/AuthController');
const AuthMiddleware = require('../controllers/middleware/AuthMiddleware');

router.post('/refresh-token', 
  AuthMiddleware.refresh, 
  AuthController.login
);

router.post('/login',
  AuthMiddleware.local,
  AuthController.login
);

router.post('/logout', [
    AuthMiddleware.refresh,
    AuthMiddleware.bearer
  ],
  AuthController.logout
);

module.exports = router;