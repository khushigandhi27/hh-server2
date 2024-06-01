const { displayCategoryProducts } = require('../../database-functions/category/display-category-products');
const generateResponse = require('../../utils/generate-response');

const displayCategoryProductsController = async (req, res, next) => {
    try{
        const { categoryId, cid } = req.query;
        const {categoryProducts} = await displayCategoryProducts(categoryId, cid);
        return res.send(generateResponse('Fetched category products successfully', {categoryProducts}));
    } catch(error){
        return next(error);
    }
};

module.exports = displayCategoryProductsController;