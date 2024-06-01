const admin = require('../config/firebase-config');
const {COLLECTIONS} = require('../constants/collection-constants');
const db = admin.firestore();

const createAdminAccount = async adminData =>
{
    try 
    {
        await db.collection(COLLECTIONS.ADMIN).doc(adminData.aid).set(adminData);
        const snapshot = await db.collection(COLLECTIONS.ADMIN).where('aid','==',adminData.aid).get();
        const admin = snapshot.docs.map(doc => doc.data());
        console.log('Account created successfully');
        return {admin};
    }
    catch(error)
    {
       return error;
    }
};
module.exports={createAdminAccount};