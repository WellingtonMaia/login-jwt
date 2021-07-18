const Repository = require('./Repository');

class PostRepository extends Repository {
  constructor() {
    super('Post');
  }
}

module.exports = PostRepository;