/* eslint-disable no-useless-catch */
const httpStatus = require('http-status');

const getMessage = require('./get-message');

const generateResponse = (messageKey, data = [], code = httpStatus.OK) => {
  try {
    return {
      code,
      message: getMessage(messageKey),
      data,
    };
  } catch (error) {
    // logger.error(`ERROR FROM generateResponse ==> ${error}`);
    throw error;
  }
};
module.exports = generateResponse;
