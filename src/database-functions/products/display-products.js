const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const getProducts = async (limit, startAfter, productName) => {
    try {
        let query = db.collection(COLLECTIONS.PRODUCTS);

        if (productName) {
            query = query.where('productName', '>=', productName).where('productName', '<=', productName + '\uf8ff');
        }

        query = query.orderBy('createdAt', 'desc');

        if (startAfter) {
            const startAfterDoc = await db.collection(COLLECTIONS.PRODUCTS).doc(startAfter).get();
            query = query.startAfter(startAfterDoc);
        }

        query = query.limit(Number(limit));

        const productSnapshot = await query.get();
        const products = productSnapshot.docs.map(doc => doc.data());

        const lastDoc = productSnapshot.docs[productSnapshot.docs.length - 1];
        const nextStartAfter = lastDoc ? lastDoc.id : null;

        const totalCount = (await db.collection(COLLECTIONS.PRODUCTS).get()).size;

        console.log(`Displayed Products successfully`);
        return { products, nextStartAfter, totalCount };
    } catch (error) {
        console.log('Error fetching products:', error);
        throw error;
    }
};

module.exports = { getProducts };
