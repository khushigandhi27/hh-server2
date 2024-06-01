const { getBanner } = require('../../database-functions/banners/display-banners');
const generateResponse = require('../../utils/generate-response');

const getBannerController = async (req, res, next) => {
    try{
        let { limit = 10, startAfter } = req.query;
        const {banner, nextStartAfter, totalCount} = await getBanner(limit, startAfter);
        return res.send(generateResponse('Fetched banner successfully', {banner, nextStartAfter,totalCount}));
    } catch (error){
        return next(error);
    }
};

module.exports = getBannerController;