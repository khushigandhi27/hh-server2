const { checkSchema } = require('express-validator');

const getMessage = require('../../utils/get-message');

const createAdminValidator = checkSchema ({
  firebaseAdminId:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'firebaseAdminId'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'firebaseAdminId'),
    },
  },
    name:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'name'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'name'),
    },
  },
  email:{
    
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', ' email'),
    },
  },
});

module.exports = createAdminValidator;