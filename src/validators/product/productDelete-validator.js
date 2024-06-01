const { checkSchema } = require('express-validator');
const getMessage = require('../../utils/get-message');

const deleteProductValidator = checkSchema({
    ProductId: {
        exists: {
            errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', ' ProductId'),
        },
        isString: {
            errorMessage: getMessage('INPUT-NUMERIC').replace('{{ input }}', ' ProductId'),
        },
    }
});

module.exports = deleteProductValidator;
