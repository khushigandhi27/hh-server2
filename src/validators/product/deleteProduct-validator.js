const { checkSchema } = require('express-validator');
const getMessage = require('../../utils/get-message');

const deleteProductValidator = checkSchema({
    selectedItems: {
        exists: {
            errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'selectedItems'),
        },
        isArray: {
            errorMessage: getMessage('INPUT-ARRAY').replace('{{ input }}', 'selectedItems'),
        },
    },
});

module.exports = deleteProductValidator;
