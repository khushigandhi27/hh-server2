const { checkSchema } = require('express-validator');

const getMessage = require('../../utils/get-message');

const createSavedProductsValidator = checkSchema ({
    cid:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'cid'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'cid'),
    },
   },
 
   productId:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'productId'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'productId'),
    },
   },
});

module.exports = createSavedProductsValidator;