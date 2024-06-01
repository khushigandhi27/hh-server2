const admin = require('../config/firebase-config');
const {COLLECTIONS} = require('../constants/collection-constants');
const db = admin.firestore();

const getProducts = async(vendorId,productName) =>
{
    try
    {  
        let query = db.collection(COLLECTIONS.PRODUCTS);
        
        if(vendorId){
            query = query.where('vendorId','==',vendorId);
        }

        if(productName){
            query = query.where('productName','==',productName);
        }

        const snapshot = await query.get();
        const products = snapshot.docs.map(doc =>  doc.data());

        return {products};
    }
    catch(error)
    { 
        console.log('error fetching products',error);
        throw error;
    }
};
module.exports= {getProducts};