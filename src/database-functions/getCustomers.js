
const admin = require('../config/firebase-config');
const { COLLECTIONS } = require('../constants/collection-constants');
const db = admin.firestore();

const displayCustomer = async (limit,startAfter,searchItem,id) => {
    try {
        let query = db.collection(COLLECTIONS.CUSTOMERS);

        if(id){
            query = query.where('id','==',id);
        }
        
        if(startAfter){
        const startAfterDoc = await db.collection(COLLECTIONS.CUSTOMERS).doc(startAfter).get();
        query = query.startAfter(startAfterDoc);
        }

        if(searchItem){
            query = query.where('firstName','>=',searchItem).where('firstName','<=',searchItem + '/uf8ff');
        }

        query = query.limit(Number(limit));
        
        const snapshot = await query.get();
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        const nextStartAfter = lastDoc ? lastDoc.id : null;

        const totalCount = (await db.collection(COLLECTIONS.CUSTOMERS).get()).size;
        const customers = snapshot.docs.map(doc => doc.data());
        return {customers,nextStartAfter,totalCount};
    } catch (error) {
        console.log('Error fetching all customers:', error);
        throw error;
    }
};

module.exports = { displayCustomer };





// const admin = require('../config/firebase-config');
// const {COLLECTIONS} = require('../constants/collection-constants');
// const db = admin.firestore();

// const displayCustomer = async (limit,startAfter,searchItem) =>
// {
//     try
//     {
//         let query = db.collection(COLLECTIONS.CUSTOMERS);
//         if(startAfter){
//            const startAfterDoc = await db.collection(COLLECTIONS.CUSTOMERS).doc(startAfter).get();
//             query= query.startAfter(startAfterDoc);
//         }
//         query = query.limit(Number(limit));
//         if(searchItem){
//             query = query.where('firstName','>=',searchItem).where('firstName','<=',searchItem +'/uf8ff');
//         }
//         const snapshot = await query.get();
        
//         const lastDoc = snapshot.docs[snapshot.docs.length - 1];
//         const nextStartAfter = lastDoc ? lastDoc.id : null;
    
//         const totalCount = (await db.collection(COLLECTIONS.CUSTOMERS).get()).size;

//         console.log(totalCount);
//         console.log(nextStartAfter,lastDoc);
//         const result = snapshot.docs.map(doc => doc.data());
       
//        return {result,nextStartAfter,totalCount};
//     }
//     catch(error)
//     {
//         console.log(error);
//         return error;
//     }
// };
// module.exports={displayCustomer};

// const admin = require('../config/firebase-config');
// const { COLLECTIONS } = require('../constants/collection-constants');
// const db = admin.firestore();

// const displayCustomer = async () => {
//     try {
//         console.log("Querying Firestore for customer data...");
//         const snapshot = await db.collection(COLLECTIONS.CUSTOMERS).get();
//         console.log("Query successful. Received snapshot:", snapshot);
//         return snapshot.docs;
//     } catch (error) {
//         console.error("Error while querying Firestore for customer data:", error);
//         throw error;
//     }
// };