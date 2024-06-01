const {getProducts} = require('../../database-functions/getProduct');
const generateResponse = require('../../utils/generate-response');

const getProductController = async(req, res, next) =>
{
    try
    {      
      const {vendorId,productName} = req.query;
      const {products, totalCount} = await getProducts(vendorId,productName);
       
      return res.send(generateResponse('products displayed',{products, totalCount}));
    }
    catch(error)
    {
      console.log(error);
       return next(error);
    }
};
module.exports=getProductController;