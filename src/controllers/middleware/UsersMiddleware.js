const UserRepository = require('../../repositories/UserRepository');
const repository = new UserRepository();
const Tokens = require('../auth/Tokens');

class UserMiddleware {
  static async setUser(req, res, next) {
    try {
      const { token } = req.params;
      const id = await Tokens.checkedEmail(token);
      const user = await repository.getById(id);

      req.user = user;
      
      next();
    } catch (error) {
      
      if (error && error.name === 'JsonWebTokenError') {
        return res.status(401).json({error: error.message});
      }

      if (error && error === 'jwt expired') {
        return res
        .status(401)
        .json({error: error});
      }

     return res.status(500).json(error.message); 
    }
  }
}

module.exports = UserMiddleware;