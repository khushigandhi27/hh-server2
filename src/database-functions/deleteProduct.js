const admin = require('../config/firebase-config');
const { COLLECTIONS } = require('../constants/collection-constants');
const db = admin.firestore();

const deleteProducts = async (selectedItems) => {
    try {
        const batch = db.batch();

        selectedItems.forEach(productId => {
            const docRef = db.collection(COLLECTIONS.PRODUCTS).doc(productId);
            batch.delete(docRef);
        });

        await batch.commit();
        return true;
    } catch (error) {
        return error;
    }
};

module.exports = { deleteProducts };
