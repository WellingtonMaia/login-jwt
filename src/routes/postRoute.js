const router = require('express').Router({
  mergeParams: true
});

const PostController = require('../controllers/PostController');
const validation = require('./validation/post');
const AuthMiddleware = require('../controllers/middleware/AuthMiddleware');
const AuthorizationMiddleware = 
require('../controllers/middleware/AuthorizationMiddleware');
const TryAutentication = 
require('../controllers/middleware/TryAuthentication');
const TryToAuthorize = require('../controllers/middleware/TryToAuthorize');

router.get('/',
  [
    TryAutentication.isAuthenticating,
    TryToAuthorize.isAuthorize('post', 'read')
  ],
  PostController.index
);

router.post('/',
  [
    AuthMiddleware.bearer,
    AuthorizationMiddleware.permission('post', 'create'),
    validation
  ], 
  PostController.store
);

router.get('/:id', 
  [
    AuthMiddleware.bearer,
    AuthorizationMiddleware.permission('post', 'read')
  ],
  PostController.show
);

router.put('/:id', 
  [
    AuthMiddleware.bearer,
    AuthorizationMiddleware.permission('post', 'update'),
    validation, 
  ],
  PostController.update
);

router.delete('/:id', 
  [
    AuthMiddleware.bearer,
    AuthMiddleware.local,
    AuthorizationMiddleware.permission('post', 'delete'),
  ],
  PostController.delete
);

router.post('/:id/restore',
  [
    AuthMiddleware.bearer,
    AuthorizationMiddleware.permission('post', 'update'), 
  ],
  PostController.restore
);

module.exports = router;