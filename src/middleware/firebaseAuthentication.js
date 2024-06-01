const httpStatus = require('http-status');
const { get } = require('lodash');

const firebaseAdmin = require('../config/firebase-config');
const defaultLogger = require('../logger');
const getMessage = require('../utils/get-message');
const ApiError = require('../utils/ApiError');

const firebaseAuthentication = async (req, res, next) => {
  const { logInfo = {} } = req;
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(getMessage('NOT_LOGGED_IN'), httpStatus.UNAUTHORIZED);
    }

    if (!token.startsWith('Bearer ')) {
      throw new ApiError(getMessage('INVALID_TOKEN'), httpStatus.UNAUTHORIZED);
    }
    const authToken = token.slice(7, token.length);
    try {
      const user = await firebaseAdmin.auth().verifyIdToken(authToken);
      req.user = user;
    } catch (err) {
      const firebaseErrorCode = get(err, 'errorInfo.code');
      if (firebaseErrorCode === 'auth/id-token-expired') {
        throw new ApiError(getMessage('SESSION_EXPIRED'), httpStatus.UNAUTHORIZED);
      }
    }

    return next();
  } catch (error) {
    defaultLogger(`Error from firebaseAuthentication => ${error.message}`, logInfo, 'error');
    return next(error);
  }
};

module.exports = firebaseAuthentication;