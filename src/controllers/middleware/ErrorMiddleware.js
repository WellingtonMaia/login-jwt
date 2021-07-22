const { CustomError } = require("../../errors/erros");
const { TokenExpiredError, JsonWebTokenError } = require('jsonwebtoken');

class ErrorMiddleware {
  static processing(error, req, res, next) {
    let status = 500;
    const body = {
      message: error.message
    };

    if (error instanceof CustomError) {
      return res.status(error.status).json(error.boby);
    }

    if (error instanceof TokenExpiredError) {
      status = 401;
      body.expireAt = error.expiredAt
    }

    if (error instanceof JsonWebTokenError) {
      status = 401;
    }

    res.status(status).json(body);
  }
}

module.exports = ErrorMiddleware;