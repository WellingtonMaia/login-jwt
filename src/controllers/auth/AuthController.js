const token = require('./Token');
const ManipuleBlacklist = require('../../redis/ManipuleBlacklist');

class AuthController {
  static login (req, res) {
    try {

      const tokenGenerated = token.createTokenJWT(req.user);
      
      res.set('Authorization', tokenGenerated);

      return res.status(204).end(); 
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async logout (req, res) {
    try {
      const token = req.token;
      await ManipuleBlacklist.addToken(token);
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = AuthController;