const { displayVendorsByVendorId } = require('../../database-functions/vendor/displayVendorByVendorId');
const generateResponse = require('../../utils/generate-response');

const displayVendorByVendorIdController = async (req, res, next) => {
    try{
        const {vendorId} = req.query;
        const {vendors} = await displayVendorsByVendorId(vendorId);
        return res.send(generateResponse("fetched vendors by vendorId", {vendors}));
    } catch (error){
        return next(error);
    }
};

module.exports = displayVendorByVendorIdController;