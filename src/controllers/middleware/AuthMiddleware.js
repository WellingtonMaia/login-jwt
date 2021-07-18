const passport = require('../auth/authConfig');

class AuthMiddleware {
  static local(req, res, next) {
    passport.authenticate(
      'local',
      { session: false },
      (error, user, info) => {
        
        if (error && error.name === 'InvalidArgumentError') {
          return res.status(401).json({error: error.message});
        }

        if (error) {
          return res.status(500).json(error.message);
        }
        
        if (!user) {
          return res.status(401).json({error: 'Credentials invalid'});
        }

        req.user = user;
        return next();
      }
    )(req, res, next);
  }

  static bearer(req, res, next) {
    passport.authenticate(
      'bearer',
      { session: false },
      (error, user, info) => {

        if (error && error.name === 'JsonWebTokenError') {
          return res.status(401).json({error: error.message});
        }

        if (error && error === 'jwt expired') {
          return res
          .status(401)
          .json({error: error});
        }

        if (error) {
          return res.status(500).json(error.message);
        }
        
        if (!user) {
          return res.status(401).json({error: 'Credentials invalid'});
        }
        req.token = info.token;
        req.user = user;
        return next();
      }
    )(req, res, next);
  }
}

module.exports = AuthMiddleware;