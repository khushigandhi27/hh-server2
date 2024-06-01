const { validationResult } = require('express-validator');
const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');

const validateSchema = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new ApiError(httpStatus.BAD_REQUEST, errors.array()[0].msg);
    }
    next();
}

module.exports = validateSchema;