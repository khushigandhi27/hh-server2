const shortId = require('shortid');
const {createProduct} = require('../../database-functions/create-products');
const {publishProduct} = require('../../database-functions/publishProduct');
const generateResponse = require('../../utils/generate-response');
 
const createProductController = async(req,res,next) => 
{
    try
    {
       const 
       {
        body:
        {
          name='',
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
       const productId = shortId.generate();
       const timestamp = new Date();
       const data = 
       {
          productId,
          name,
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
       }
       
      const {productsCreated} = await createProduct(data);
       
      if(isPublished){
         const productPublished = await publishProduct(data);
         return res.send(generateResponse('product published',{productPublished}));
       }

      return res.send(generateResponse('product created',{productsCreated}));

    }
    catch(error)
    {
       return next(error);
    }
};
 module.exports=createProductController;