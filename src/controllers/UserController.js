const UserRepository = require('../repositories/UserRepository');
const repository = new UserRepository();
const ValidRequest = require('./validRequest/ValidRequest');
const CheckMailService = require('../services/CheckMailService');

class UserController {
  static async index(req, res, next) {
    try {
      const users = await repository.getUsers(req.isAuthenticating, req.access);
      return res.status(200).send(users);  
    } catch (error) {
      next(error);
    }
  }

  static async show({ params }, res, next) {
    try {
      const user = await repository.getById(
        params.id,
        'Post not found'
      );

      return res.status(200).json(user); 
    } catch (error) {
      next(error);
    }
  }

  static async store(req, res, next) {
    try {
      ValidRequest.validateRequest(req);
      
      const { body } = req;
      
      const userCreated = await repository.create(body);
      
      CheckMailService.sendEmail(userCreated);

      return res.status(200).json(userCreated);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      ValidRequest.validateRequest(req);

      const { body, params } = req;
      
      const userUpdated = await repository.update(body, params.id);

      return res.status(200).json(userUpdated);
    } catch (error) {
      next(error);
    }
  }

  static async delete({ params }, res, next) {
    try {
      const userDeleted = await repository.delete(params.id);

      return res.status(200).json(userDeleted);      
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

  static async updateCheckedEmail({ user }, res, next) {
    try {
      const result = await repository.updateCheckedEmail(user.id);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;