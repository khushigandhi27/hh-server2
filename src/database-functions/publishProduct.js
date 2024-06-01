const admin = require('../config/firebase-config');
const { COLLECTIONS } = require('../constants/collection-constants');
const db = admin.firestore();

const publishProduct = async (publishedProductData) => {
    try {
        const { productId } = publishedProductData;
        const snapshot = db.collection(COLLECTIONS.PRODUCTS).doc(productId);

        const productPublished = await snapshot.update({
            isPublished: true
        });

        const productSnapshot = await db.collection(COLLECTIONS.PRODUCTS).where('productId', '==', publishedProductData.productId).get();

        if(productPublished){
            const products = await productSnapshot.docs.map(doc => doc.data());
            return products;
        }
        
        return {productPublished}; 
    } catch (error) {
        throw error;
    }
};

module.exports = {publishProduct};
