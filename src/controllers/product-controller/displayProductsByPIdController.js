const { displayProductsByPid } = require('../../database-functions/products/displayProductsByPId');
const generateResponse = require('../../utils/generate-response');

const displayProductsByPidController = async (req, res, next) => {
    try{
        const {productId, cid} = req.query;
        const {products} = await displayProductsByPid(productId, cid);
        return res.send(generateResponse("fetched products by productId",{products}));
    } catch (error){
        return next(error);
    }
};

module.exports = displayProductsByPidController;