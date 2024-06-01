const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const getBanner = async (limit, startAfter) => {
    try {
        let query = await db.collection(COLLECTIONS.BANNERS).where('isFeatured','==',true);

        if (startAfter) {
            const startAfterDoc = await db.collection(COLLECTIONS.BANNERS).doc(startAfter).get();
            query = query.startAfter(startAfterDoc);
        }

        query = query.limit(Number(limit));

        const bannerSnapshot = await query.get();
        const banner = bannerSnapshot.docs.map(doc => doc.data());

        const lastDoc = bannerSnapshot.docs[bannerSnapshot.docs.length - 1];
        const nextStartAfter = lastDoc ? lastDoc.id : null;

        const totalCount = (await db.collection(COLLECTIONS.BANNERS).where('isFeatured','==',true).get()).size;

        return {banner, nextStartAfter, totalCount};
    } catch (error) {
        console.log('Error fetching banner:', error);
        throw error;
    }
};

module.exports = { getBanner };
