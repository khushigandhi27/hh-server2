const { toggleSavedProduct } = require('../../database-functions/saved/create-saved-products');
const generateResponse = require('../../utils/generate-response');

const createSavedProductsController = async (req, res, next) => {
    try {
        const { body: { cid = '', productId = '' } } = req;

        if (!cid || !productId) {
            throw new Error('cid and productId are required');
        }

        const result = await toggleSavedProduct(cid, productId);
        return res.send(generateResponse(result.message, { saved: result.saved }));
    } catch (error) {
        return next(error);
    }
};

module.exports = createSavedProductsController;
