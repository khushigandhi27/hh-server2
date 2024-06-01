const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const toggleSavedProduct = async (cid, productId) => {
    try {
        const productSnapshot = await db.collection(COLLECTIONS.PRODUCTS)
            .where('productId', '==', productId)
            .get();

        if (productSnapshot.empty) {
            throw new Error('Invalid productId');
        }

        const docId = `${cid}_${productId}`;
        const savedDocRef = db.collection(COLLECTIONS.SAVED).doc(docId);
        const savedDocSnapshot = await savedDocRef.get();

        if (savedDocSnapshot.exists) {
            await savedDocRef.delete();
            return { message: 'Product removed from saved successfully', saved: false };
        } else {
            const data = {
                cid,
                productId,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            await savedDocRef.set(data);
            return { message: 'Product saved successfully', saved: true };
        }
    } catch (error) {
        console.error('Error toggling saved product:', error);
        throw error;
    }
};

module.exports = { toggleSavedProduct };
