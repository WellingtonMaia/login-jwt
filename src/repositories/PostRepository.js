const PostConverter = require('../converter/PostConverter');
const Repository = require('./Repository');
const { access: getAttributesToShow } = require('../utils/access');

class PostRepository extends Repository {
  constructor() {
    super('Post');
  }

  async getPosts(isAuthenticating, access) {
    let posts = await super.all();
    
    const attributes = getAttributesToShow(access);
    
    const converter = new PostConverter('json', attributes);
    
    if (!isAuthenticating) {
      posts = posts.map(post => ({
        content: String(post.content).substr(0, 40).concat(`.... 
        You need subscribe on blog to continue read the posts`)
      }));
    }

    return converter.converter(posts);
  }

  getPostsByAuthor(authorId) {
    super.all({author_id: authorId});
  }
}

module.exports = PostRepository;