const PostRepository = require('../repositories/PostRepository');
const repository = new PostRepository();
const ValidRequest = require('./validRequest/ValidRequest');

class PostsController {
  static async index(req, res) {
    try {
      const posts = await repository.all();
      return res.status(200).json(posts);  
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async show({ params }, res) {
    try {
      const post = await repository.getById(
        params.id,
        'Post not found'  
      );

      return res.status(200).json(post); 
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }

  static async store(req, res) {
    try {
      ValidRequest.validateRequest(req);

      const { body } = req;
      
      const postCreated = await repository.create(body);

      return res.status(200).json(postCreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    try {
      ValidRequest.validateRequest(req);

      const { body, params } = req;
      
      const postUpdated = await repository.update(body, params.id);

      return res.status(200).json(postUpdated);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }

  static async delete({ params }, res) {
    try {
      const postDeleted = repository.delete(params.id);

      return res.status(200).json(postDeleted);      
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }

  static async restore({ params }, res) {
    try {
      await repository.restore(params.id);
      
      return res.status(200).end();
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }  
}

module.exports = PostsController;