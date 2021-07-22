const UserController = require('../controllers/UserController');
const AuthMiddleware = require('../controllers/middleware/AuthMiddleware');
const AuthorizationMiddleware = 
require('../controllers/middleware/AuthorizationMiddleware');
const router = require('express').Router({
  mergeParams: true
});
const validation = require('./validation/user');

router.get('/', 
  [
    AuthMiddleware.bearer,
    AuthorizationMiddleware.permission('user', 'read')
  ]  
  , 
  UserController.index
);

router.post('/',
  validation,
  UserController.store
);

router.get('/:id', 
  [
    AuthMiddleware.bearer,
    AuthorizationMiddleware.permission('user', 'read')
  ], 
  UserController.show
);

router.put('/:id', 
  [
    AuthMiddleware.bearer,
    AuthorizationMiddleware.permission('user', 'update'),
    validation,
  ],
  UserController.update
);

router.delete('/:id', 
  [
    AuthMiddleware.bearer,
    AuthMiddleware.local,
    AuthorizationMiddleware.permission('user', 'delete')
  ], 
  UserController.delete
);

router.post('/:id/restore', 
  [
    AuthMiddleware.bearer,
    AuthorizationMiddleware.permission('user', 'update'),
    validation,
  ],
  UserController.restore
);

module.exports = router;