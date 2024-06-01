const { getVendor } = require('../../database-functions/getVendor');
const generateResponse = require('../../utils/generate-response');

const getVendorController = async (req, res, next) => {
    try{
         const {limit = 10,startAfter,searchItem}=req.query;
        const {vendors,nextStartAfter,totalCount} = await getVendor(limit,startAfter,searchItem);
        return res.send(generateResponse('Fetched vendors successfully', {vendors,nextStartAfter,totalCount}));
    } catch (error){
        return next(error);
    }
};

module.exports = getVendorController;
