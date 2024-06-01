const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const displayVendorsByVendorId = async vendorId => {
    try{
        const snapshot = await db.collection(COLLECTIONS.VENDOR).where('vendorId','==',vendorId).get();
        let vendors = {};
        snapshot.forEach(doc => {
            vendors = doc.data();
        });
        console.log(`Displayed Vendor with vendorId successfully`);
        return {vendors};
    } catch (error){
        console.log("Error in getting the vendors by vendorId", error);
        return error;
    }
};
module.exports = { displayVendorsByVendorId };