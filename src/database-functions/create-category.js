const admin = require('../config/firebase-config');
const {COLLECTIONS} = require('../constants/collection-constants');
const db = admin.firestore();

const createCategory = async categoryData => {
    try
    {
      await db.collection(COLLECTIONS.CATEGORY).doc(categoryData.categoryId).set(categoryData);
      return true;
    }
    catch(error)
    {
      console.log(error);
     return error;
    }
};
const createStarredCategory = async (data) => {
    try {
        await db.collection(COLLECTIONS.STARED).doc(data.scid).set(data);
        return { starredCategory: data };
    } catch (error) {
        console.error('Error creating starred category:', error);
        throw error;
    }
};

const deleteStarredCategory = async (categoryId) => {
    try {
        const snapshot = await db.collection(COLLECTIONS.STARED).where('categoryId', '==', categoryId).get();
        
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        const batch = db.batch();
        snapshot.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        console.log('Successfully deleted starred categories with categoryId:', categoryId);

    } catch (error) {
        console.error('Error deleting starred category:', error);
        throw error;
    }
};

module.exports={createCategory,deleteStarredCategory,createStarredCategory};