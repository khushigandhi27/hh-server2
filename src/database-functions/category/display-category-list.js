const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const displayCategoryList = async (limit, startAfter) => {
    try {
        let query = db.collection(COLLECTIONS.CATEGORY);

        if (startAfter) {
            const startAfterDoc = await db.collection(COLLECTIONS.CATEGORY).doc(startAfter).get();
            query = query.startAfter(startAfterDoc);
        }

        query = query.limit(Number(limit));

        const categorySnapshot = await query.get();
        const categoryList = categorySnapshot.docs.map(doc => ({
            ...doc.data()
        }));
        const lastDoc = categorySnapshot.docs[categorySnapshot.docs.length - 1];
        const nextStartAfter = lastDoc ? lastDoc.id : null;

        const starredCategoriesSnapshot = await db.collection(COLLECTIONS.STARED).get();
        const starredCategoryData = starredCategoriesSnapshot.docs.map(doc => doc.data());

        const categorizedList = categoryList.map(category => {
            const isStarred = starredCategoryData.some(starredCategory => starredCategory.categoryId.includes(category.categoryId));
            return {
                ...category,
                isStarred
            };
        });

        return { categoryList: categorizedList, nextStartAfter };
    } catch (error) {
        console.error('Error fetching all categories:', error);
        throw error;
    }
};

module.exports = { displayCategoryList };