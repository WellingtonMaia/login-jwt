const passport = require('../auth/authConfig');

const UserRepository = require('../../repositories/UserRepository');
const repository = new UserRepository();

const Tokens = require('../auth/Tokens');

class AuthMiddleware {
  static local(req, res, next) {
    passport.authenticate(
      'local',
      { session: false },
      (error, user, info) => {
        if (error) {
          return next(error);
        }

        req.user = user;
        req.isAuthenticating = true;
        return next();
      }
    )(req, res, next);
  }

  static bearer(req, res, next) {
    passport.authenticate(
      'bearer',
      { session: false },
      (error, user, info) => {
        if (error) {
          return next(error);
        }
        
        req.token = info.token;
        req.user = user;
        req.isAuthenticating = true;
        return next();
      }
    )(req, res, next);
  }

  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const id = await Tokens.checkOpacoToken(refreshToken);
      await Tokens.invalidateOpacoToken(refreshToken);
      req.user = await repository.getById(id);
      req.isAuthenticating = true;
      return next();
    
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = AuthMiddleware;