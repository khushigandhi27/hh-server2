const httpStatus = require('http-status');

const ApiError = require('./ApiError');

const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = httpStatus;

 const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    // Sentry.captureException(err);
    const statusCode = error.statusCode ? BAD_REQUEST : INTERNAL_SERVER_ERROR;
    // eslint-disable-next-line security/detect-object-injection
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const response = {
    code: err.statusCode,
    message: err.message,
  };
  return res.status(err.statusCode).json(response);
};

 module.exports = { errorConverter, errorHandler };
//module.exports =  errorHandler;
