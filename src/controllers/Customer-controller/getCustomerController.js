const {displayCustomer} = require('../../database-functions/getCustomers');
const generateResponse = require('../../utils/generate-response');

 const displayCustomerController = async(req,res,next) =>
 {
    try
    {
      const {limit = 10,startAfter,searchItem,id} = req.query;
       const {customers,nextStartAfter,totalCount} = await displayCustomer(limit,startAfter,searchItem,id);
       return res.send(generateResponse('displayed',{customers,nextStartAfter,totalCount}));
    }
    catch(error)
    {
      return next(error);
    }
 };
 
 module.exports=displayCustomerController;