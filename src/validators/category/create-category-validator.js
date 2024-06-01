const { checkSchema } = require('express-validator');

const getMessage = require('../../utils/get-message');

const createCategoryValidator = checkSchema ({

  categoryName:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'categoryName'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'categoryName'),
    },
  },
  image:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED cImage').replace('{{ input }}', 'image'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'image'),
    },
   }
 
});

module.exports = createCategoryValidator;