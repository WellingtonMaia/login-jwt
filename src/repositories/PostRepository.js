const PostConverter = require('../converter/PostConverter');
const Repository = require('./Repository');

class PostRepository extends Repository {
  constructor() {
    super('Post');
  }

  async getPosts(isAuthenticating, access) {
    let posts = await super.all();
    
    const attributes = access.any.allowed 
    ? access.any.attributes 
    : access.own.attributes; 
    
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