const UserRepository = require('../repositories/UserRepository');
const repository = new UserRepository();
const ValidRequest = require('./validRequest/ValidRequest');
const CheckMailService = require('../services/CheckMailService');

class UserController {
  static async index(req, res) {
    try {
      const users = await repository.all();
      return res.status(200).json(users);  
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async show({ params }, res) {
    try {
      const user = await repository.getById(
        params.id,
        'Post not found'
      );

      return res.status(200).json(user); 
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }

  static async store(req, res) {
    try {
      ValidRequest.validateRequest(req);
      
      const { body } = req;
      
      const userCreated = await repository.create(body);
      
      CheckMailService.sendEmail(userCreated);

      return res.status(200).json(userCreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    try {
      ValidRequest.validateRequest(req);

      const { body, params } = req;
      
      const userUpdated = await repository.update(body, params.id);

      return res.status(200).json(userUpdated);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }

  static async delete({ params }, res) {
    try {
      const userDeleted = repository.delete(params.id);

      return res.status(200).json(userDeleted);      
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

  static async updateCheckedEmail({ user }, res) {
    try {
      const result = await repository.updateCheckedEmail(user.id);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = UserController;