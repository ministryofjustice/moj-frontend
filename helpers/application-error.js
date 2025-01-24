class ApplicationError extends Error {
  constructor(message, status = 500) {
    super(message);

    this.name = this.constructor.name;

    this.status = status;

    // capture the stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  toErrorObject() {
    return {
      message: this.message,
      status: this.status,
      name: this.name,
    };
  }
}

module.exports = ApplicationError;
