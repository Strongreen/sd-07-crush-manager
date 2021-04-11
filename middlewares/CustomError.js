class CustomError extends Error {
    constructor(status, message) {
      super(status, message);
      this.status = status;
      this.message = message;
      Error.captureStackTrace(this, CustomError);
    }
  }

module.exports = CustomError;
