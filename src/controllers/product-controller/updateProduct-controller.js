const {updateProducts} = require('../../database-functions/updateProduct');
const lodash = require('lodash');
const generateResponse= require('../../utils/generate-response');

const updateProductController = async(req,res,next) =>
{
    try
    {
        const 
        {
            body:
            {
                productId='',
                productName='',
                amount='',
                status='',
                description='',
                categoryId='',
                isPublished=false,
                coverImages='',
                subImages=[],
                vendorId,
            },
        }=req;
        //const {productId} = req.query;
        const timestamp = new Date();
        let data = 
        { 
            productId,
            productName,
            amount,
            status,
            description,
            categoryId,
            isPublished,
            coverImages,
            subImages,
            vendorId, 
            createdAt:timestamp,
            updatedAt:timestamp,
        };
        data = lodash.pickBy(data, lodash.identity);
        const {updatedProducts} = await updateProducts(data);
        return res.send(generateResponse('updated',{updatedProducts}));
    }
    catch(error)
    {
        console.log('controller error',error);
       return next(error);
    }
};
module.exports=updateProductController;