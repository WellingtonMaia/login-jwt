const AccessControll = require('accesscontrol');
const control = new AccessControll();

control
  .grant('subscriber')
  .readAny('post', ['id', 'title'])
  .readAny('user', ['name']);

control
  .grant('editor')
  .extend('subscriber')
  .createOwn('post')
  .updateOwn('post')
  .deleteOwn('post')
  .updateOwn('user');

control
  .grant('admin')
  .readAny('post', ['id', 'title', 'author_id', 'createdAt'])
  .createAny('post')
  .updateAny('post')
  .deleteAny('post')
  .readAny('user')
  .createAny('user')
  .updateAny('user')
  .deleteAny('user');

module.exports = control;