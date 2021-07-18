const { validationResult } = require('express-validator');

class ValidRequest {
  static validateRequest(request) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      const msgErrors = errors.errors.map(err => err.msg);
      throw new Error(msgErrors);
    }
  }
}

module.exports = ValidRequest;