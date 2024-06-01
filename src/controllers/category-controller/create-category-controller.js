const shortId = require('shortid');
const {createCategory} = require('../../database-functions/create-category');
const generateResponse = require('../../utils/generate-response');

const createCategoryController = async(req,resp,next) => 
{
    try
    {
       const 
       {
        body:
        {
           categoryName='',
           image='',
        },
       }=req;

       const categoryId = shortId.generate();
       const timestamp = new Date();

       const data =
       {
         categoryId,
         categoryName,
         image,
         createdAt: timestamp,
         updatedAt: timestamp, 
       }
       await createCategory(data);
       return resp.send(generateResponse('category added',data));
    }
    catch(error)
    {
        return next(error);
    }
};

module.exports=createCategoryController;