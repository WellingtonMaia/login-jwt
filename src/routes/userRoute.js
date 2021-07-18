const UserController = require('../controllers/UserController');
const router = require('express').Router({
  mergeParams: true
});
const validation = require('./validation/user');

router.get('/', UserController.index);

router.post('/', validation, UserController.store);

router.get('/:id', UserController.show);

router.put('/:id', validation, UserController.update);

router.delete('/', UserController.delete);

router.post('/:id/restore', UserController.restore);

module.exports = router;