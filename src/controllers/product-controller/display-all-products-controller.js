const { getProducts } = require('../../database-functions/products/display-products');
const generateResponse = require('../../utils/generate-response');

const getProductsController = async (req, res, next) => {
    try {
        let { limit = 10, startAfter, productName } = req.query;
        const {products,nextStartAfter,totalCount} = await getProducts(limit, startAfter, productName);
        return res.send(generateResponse('Fetched products successfully', {products, nextStartAfter, totalCount}));
    } catch (error) {
        return next(error);
    }
};

module.exports = getProductsController;
