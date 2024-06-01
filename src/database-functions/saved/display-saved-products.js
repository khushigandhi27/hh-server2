const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const displaySavedProducts = async (customerId, limit = 10, startAfter) => {
    try {
        let query = db.collection(COLLECTIONS.SAVED).where('cid', '==', customerId);

        if (startAfter) {
            const startAfterDoc = await db.collection(COLLECTIONS.SAVED).doc(startAfter).get();
            if (startAfterDoc.exists) {
                query = query.startAfter(startAfterDoc);
            }
        }

        query = query.limit(Number(limit));

        const productSavedQuery = await query.get();
        const displayProducts = [];

        if (productSavedQuery.empty) {
            return { displayProducts, nextStartAfter: null, totalCount: 0 };
        }

        const productIds = productSavedQuery.docs.map(doc => doc.data().productId);

        const productsSnapshot = await db.collection(COLLECTIONS.PRODUCTS)
            .where(admin.firestore.FieldPath.documentId(), 'in', productIds)
            .get();

        const products = productsSnapshot.docs.map(doc => doc.data());

        displayProducts.push(...products);

        const lastDoc = productSavedQuery.docs[productSavedQuery.docs.length - 1];
        const nextStartAfter = lastDoc ? lastDoc.id : null;

        const totalCountQuery = await db.collection(COLLECTIONS.SAVED).where('cid', '==', customerId).get();
        const totalCount = totalCountQuery.size;

        console.log("Displayed saved products successfully");
        return { displayProducts, nextStartAfter, totalCount };
    } catch (error) {
        console.log("Error in displaying saved products:", error);
        throw error;
    }
};

module.exports = { displaySavedProducts };
