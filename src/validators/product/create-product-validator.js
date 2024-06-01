const { checkSchema } = require('express-validator');

const getMessage = require('../../utils/get-message');

const createProductValidator = checkSchema ({
    name:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED name ').replace('{{ input }}', 'productName'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'productName'),
    },
   },
  amount:{
    
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED amount').replace('{{ input }}', ' amount'),
    },
  },
  status:{
    
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED status').replace('{{ input }}', 'status'),
    },
  },
  description:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED description').replace('{{ input }}', 'description'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'description'),
    },
   },
   categoryId:{
    
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED categoryId').replace('{{ input }}', 'categoryId'),
    },
  },
  isPublished:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED published').replace('{{ input }}', 'isPublished'),
    },
    isBoolean: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'isPublished'),
    },
   },
   coverImages:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED cImage').replace('{{ input }}', 'coverImages'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'coverImages'),
    },
   },
   subImages:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED sImage').replace('{{ input }}', 'subImages'),
    },
    isArray: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'subImages'),
    },
   },
   vendorId:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED sImage').replace('{{ input }}', 'vendorId'),
    },
   isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'vendorId'),
    },
   },
});

module.exports = createProductValidator;