const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const displayCategoryProducts = async (categoryId, cid) => {
    try {
        const categoryData = await db.collection(COLLECTIONS.PRODUCTS)
            .where('categoryId', '==', categoryId)
            .get();
        
        const categoryProducts = categoryData.docs.map(doc => ({
            ...doc.data(),
            id: doc.id 
        }));

        const savedDoc = await db.collection(COLLECTIONS.SAVED).doc(cid).get();
        const savedProductIds = new Set(savedDoc.exists ? savedDoc.data().productId : []);

        const categoryProductsWithIsLiked = categoryProducts.map(product => ({
            ...product,
            isLiked: savedProductIds.has(product.id),
        }));

        categoryProductsWithIsLiked.forEach(product => delete product.id);

        console.log(`Fetched category products successfully`);
        return { categoryProducts: categoryProductsWithIsLiked };
    } catch (error) {
        console.log('Error fetching category products:', error);
        throw error;
    }
};

module.exports = { displayCategoryProducts };
