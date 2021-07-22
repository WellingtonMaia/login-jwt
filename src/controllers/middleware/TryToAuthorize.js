const AuthorizationMiddleware = require('./AuthorizationMiddleware');

class TryToAuthorize {
  static isAuthorize(entity, action) {
    return (req, res, next) => {
      if (req.isAuthenticating) {
        return AuthorizationMiddleware.permission(
          entity, action
        )(req, res, next);
      }
  
      next();
    }
  }
}

module.exports = TryToAuthorize;