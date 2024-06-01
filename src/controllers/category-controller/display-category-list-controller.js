const { displayCategoryList } = require('../../database-functions/category/display-category-list');
const generateResponse = require('../../utils/generate-response');

const displayCategoryListController = async (req, res, next) => {
    try {
        const { limit = 10, startAfter } = req.query;
        const { categoryList, nextStartAfter } = await displayCategoryList(limit, startAfter);

        return res.send(generateResponse('Fetched categories successfully', {
            categoryList,
            nextStartAfter
        }));
    } catch (error) {
        return next(error);
    }
};

module.exports = displayCategoryListController;