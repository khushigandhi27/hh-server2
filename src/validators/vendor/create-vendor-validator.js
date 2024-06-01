const { checkSchema } = require('express-validator');

const getMessage = require('../../utils/get-message');

const createVendorValidator = checkSchema ({
    name:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'vendorName'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'vendorName'),
    },
   },
 
   email:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'vendorEmail'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'vendorEmail'),
    },
   },
   address:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'vendorAddress'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'vendorAddress'),
    },
   },
   phoneNumber:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'vendorMobileNumber'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'vendorMobileNumber'),
    },
   },
   bio:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'bio'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'bio'),
    },
   },
   businessName:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'businessName'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'businessName'),
    },
   }, 
   image:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'image'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'image'),
    },
   }, 
});

module.exports = createVendorValidator;