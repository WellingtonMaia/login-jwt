
class CustomError extends Error {
  constructor(name, message, status, body = {}) {
    super(message);
    this.name = name;
    this.status = status;
    this.boby = Object.assign({ message: this.message}, { ...body } );
  }
}

class InvalidArgumentError extends CustomError {
  constructor(message) {
    super('InvalidArgumentError', message, 400);
  }
}

class InternalServerError extends CustomError {
  constructor(message) {
    super('InternalServerError', message, 400);
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super('NotFoundError', message, 404)
  }
}

class NotAuthorized extends CustomError {
  constructor() {
    const message = "Cannot access this feature"
    super('NotAuthorized', message, 403)
  }
}

module.exports = {
  InvalidArgumentError,
  InternalServerError,
  NotFoundError,
  CustomError,
  NotAuthorized
};
