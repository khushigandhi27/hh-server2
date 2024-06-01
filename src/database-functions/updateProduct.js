const admin = require('../config/firebase-config');
const { COLLECTIONS } = require('../constants/collection-constants');
const db = admin.firestore();

const updateProducts = async updateData =>
{
    try
    {
      await db.collection(COLLECTIONS.PRODUCTS).doc(updateData.productId).update(updateData);
      const snapshot = await db.collection(COLLECTIONS.PRODUCTS).where('productId','==',updateData.productId).get();
      const updatedProducts = snapshot.docs.map(doc => doc.data());
      return {updatedProducts};
    }
    catch(error)
    {
        console.log('database error',error);
       return error;
    }
};
module.exports={updateProducts};