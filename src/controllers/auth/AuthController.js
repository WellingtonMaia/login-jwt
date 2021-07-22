const { NotFoundError, CustomError } = require('../../errors/erros');
const UserService = require('../../services/UserService');
const Tokens = require('./Tokens');
const ValidRequest = require('../validRequest/ValidRequest');

class AuthController {
  static async login ({ user }, res, next) {
    try {
      const accessToken = Tokens.createJsonWebToken(user.id);
      const refreshToken =  await Tokens.createOpacoToken(user.id);
      
      res.set('Authorization', accessToken);

      return res.status(200).json({ refreshToken }); 
    } catch (error) {
      next(error);
    }
  }

  static async logout (req, res, next) {
    try {
      const token = req.token;
      await Tokens.invalidateJsonWebToken(token);
      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(req, res, next) {
    
    const defaultMsg = `If found a user with this email, we send an message with 
    the instruction to reset password`;

    try {

      const {email} = req.body;
      await UserService.forgotPassword(email)  
    
      return res.status(200).send(defaultMsg);
    } catch (error) {
    
      if (error instanceof NotFoundError) {
        error = new CustomError('CustomError', defaultMsg, 401);
      }
    
      next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      ValidRequest.validateRequest(req);
      const { token, password } = req.body;
      
      await UserService.resetPassword(token, password);

      res.status(200).json(`Password reseted with success!`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;