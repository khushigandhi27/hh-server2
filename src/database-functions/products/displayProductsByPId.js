const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const displayProductsByPid = async (productId, cid) => {
    try {
        const snapshot = await db.collection(COLLECTIONS.PRODUCTS)
            .where('productId', '==', productId)
            .get();
        let product = null;

        snapshot.forEach(doc => {
            if (doc.exists) {
                product = {
                    ...doc.data()
                };
            }
        });

        if (!product) {
            console.log(`No product found with productId: ${productId}`);
            return { products: null };
        }

        console.log(`Displayed Product with productId: ${productId} successfully`);
        return { products: product };
    } catch (error) {
        console.log("Error in getting the product by pid", error);
        throw error;
    }
};

module.exports = { displayProductsByPid };
