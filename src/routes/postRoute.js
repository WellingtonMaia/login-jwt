const router = require('express').Router({
  mergeParams: true
});

const PostController = require('../controllers/PostController');
const validation = require('./validation/post');

router.get('/', PostController.index);

router.post('/', validation, PostController.store);

router.get('/:id', PostController.show);

router.put('/:id', validation, PostController.update);

router.delete('/', PostController.delete);

router.post('/:id/restore', PostController.restore);

module.exports = router;