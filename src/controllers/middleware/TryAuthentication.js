const AuthMiddleware = require('./AuthMiddleware');

class TryAutentication {
  static isAuthenticating(req, res, next) {
    try {
      req.isAuthenticating = false;
      if (req.get('Authorization')) {
        return AuthMiddleware.bearer(req, res, next);
      }
  
      next();
    } catch (error) {
      next(error.message);
    }
  }
}

module.exports = TryAutentication;