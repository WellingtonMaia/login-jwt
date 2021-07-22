const router = require('express').Router({
  mergeParams: true
});
const AuthController = require('../controllers/auth/AuthController');
const AuthMiddleware = require('../controllers/middleware/AuthMiddleware');
const validator = require('./validation/auth');

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

router.post('/forgot-password', AuthController.forgotPassword);

router.post('/reset-password',
  validator.resetPassword,  
  AuthController.resetPassword);

module.exports = router;