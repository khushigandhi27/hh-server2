const { checkSchema } = require('express-validator');

const getMessage = require('../../utils/get-message');

const createStarredCategoryValidator = checkSchema ({
    categoryId:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'categoryId'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'categoryId'),
    },
   },
   isStarred:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'isStarred'),
    },
    isBoolean: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'isStarred'),
    },
   },
});

module.exports = createStarredCategoryValidator;