const PostRepository = require('../repositories/PostRepository');
const repository = new PostRepository();
const ValidRequest = require('./validRequest/ValidRequest');

class PostsController {
  static async index(req, res, next) {
    try {
      let posts = await repository.getPosts(req.isAuthenticating, req.access);

      return res.status(200).send(posts);  
    } catch (error) {
      next(error);
    }
  }

  static async show({ params }, res, next) {
    try {
      const post = await repository.getById(
        params.id,
        'Post not found'  
      );

      return res.status(200).json(post); 
    } catch (error) {
      next(error);
    }
  }

  static async store(req, res, next) {
    try {
      ValidRequest.validateRequest(req);

      const { body, user } = req;
      
      const newBody = Object.assign({}, body, {author_id: user.id});

      const postCreated = await repository.create(newBody);

      return res.status(200).json(postCreated);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      ValidRequest.validateRequest(req);

      const { body, params } = req;
      
      const postUpdated = await repository.update(body, params.id);

      return res.status(200).json(postUpdated);
    } catch (error) {
      next(error);
    }
  }

  static async delete({ params }, res, next) {
    try {
      const postDeleted = await repository.delete(params.id);

      return res.status(200).json(postDeleted);      
    } catch (error) {
      next(error);
    }
  }

  static async restore({ params }, res, next) {
    try {
      await repository.restore(params.id);
      
      return res.status(200).end();
    } catch (error) {
      next(error);
    }
  }  
}

module.exports = PostsController;