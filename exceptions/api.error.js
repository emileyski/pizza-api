module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static IsNotActivated() {
    return new ApiError(401, "The user has not verified the email");
  }

  static UnathorizatedError() {
    return new ApiError(401, "User not authorized");
  }
  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
};
