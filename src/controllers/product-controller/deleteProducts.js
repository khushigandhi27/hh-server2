const { deleteProducts } = require('../../database-functions/deleteProduct');
const generateResponse = require('../../utils/generate-response');

const deleteProductsController = async (req, res, next) => {
    try {
        const selectedItems = req.body.selectedItems;
        await deleteProducts(selectedItems);
        return res.send(generateResponse('Records Deleted'));
    } catch (error) {
        return next(error);
    }
};

module.exports = deleteProductsController;
