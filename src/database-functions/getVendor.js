const admin = require('../config/firebase-config');
const { COLLECTIONS } = require('../constants/collection-constants');
const db = admin.firestore();

const getVendor = async (limit,startAfter,searchItem) => {
    try {
        let query = db.collection(COLLECTIONS.VENDOR);

        if(startAfter){
        const startAfterDoc = await db.collection(COLLECTIONS.VENDOR).doc(startAfter).get();
        query = query.startAfter(startAfterDoc);
        }

        if(searchItem){
            query = query.where('vendorName','>=',searchItem).where('vendorName','<=',searchItem + '/uf8ff');
        }

        query = query.limit(Number(limit));

        const snapshot = await query.get();

        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        const nextStartAfter = lastDoc ? lastDoc.id : null;

        const totalCount = (await db.collection(COLLECTIONS.VENDOR).get()).size;
        const vendors = snapshot.docs.map(doc => doc.data());
        
        return {vendors,nextStartAfter,totalCount};
    } catch (error) {
        console.log('Error fetching all vendors:', error);
        throw error;
    }
};

module.exports = { getVendor };