const { checkSchema } = require('express-validator');

const getMessage = require('../../utils/get-message');

const createCustomerValidator = checkSchema ({
  firstName:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'firstName'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'firstName'),
    },
  },
  lastName:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'lastName'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'lastName'),
    },
  },
  email: {
    optional: true,
    custom: {
      options: (value, { req }) => {
        if (value && !/^\S+@\S+\.\S+$/.test(value)) {
          throw new Error(getMessage('INPUT_VALID_EMAIL').replace('{{ input }}', 'email'));
        }
        return true;
      },
    },
  },
  phoneNumber: {
    optional: true,
    isString: {
        errorMessage: getMessage('INPUT_PHONE_NO').replace('{{ input }}', 'phoneNumber'),
    },
  },
});

module.exports = {createCustomerValidator};