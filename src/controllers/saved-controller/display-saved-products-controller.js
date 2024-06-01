const { displaySavedProducts } = require('../../database-functions/saved/display-saved-products');
const generateResponse = require('../../utils/generate-response');

const displaySavedProductsController = async (req, res, next) => {
    try {
        const { cid, limit = 10, startAfter } = req.query;

        if (!cid) {
            throw new Error('cid is required');
        }

        const { displayProducts, nextStartAfter, totalCount } = await displaySavedProducts(cid, limit, startAfter);
        return res.send(generateResponse("Saved products fetched successfully", { displayProducts, nextStartAfter, totalCount }));
    } catch (error) {
        return next(error);
    }
};

module.exports = displaySavedProductsController;
