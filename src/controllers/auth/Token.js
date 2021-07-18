const jwt = require('jsonwebtoken');

class Token {
  static createTokenJWT(user) {
    const payload = {
      id: user.id
    };

    const token = jwt.sign(
      payload, 
      process.env.JWT_KEY, 
      { 
        expiresIn:  '15d' // 15 days
      }
    );

    return token;
  }
}

module.exports = Token;