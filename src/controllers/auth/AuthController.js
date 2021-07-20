const Tokens = require('./Tokens');

class AuthController {
  static async login ({ user }, res) {
    try {
      const accessToken = Tokens.createJsonWebToken(user.id);
      const refreshToken =  await Tokens.createOpacoToken(user.id);
      
      res.set('Authorization', accessToken);

      return res.status(200).json({ refreshToken }); 
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async logout (req, res) {
    try {
      const token = req.token;
      await Tokens.invalidateJsonWebToken(token);
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = AuthController;