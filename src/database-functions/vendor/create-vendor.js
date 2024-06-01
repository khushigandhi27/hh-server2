const admin = require("../../config/firebase-config");
const { COLLECTIONS } = require("../../constants/collection-constants");
const db = admin.firestore();

const createFirebaseAuthTechVendor = async ({ name, email, phoneNumber, password }) => {
  try {
    const createTechVendor = await admin.auth().createUser({
      displayName: name,
      email: email || undefined,
      phoneNumber: phoneNumber || undefined,
      password: password,
      emailVerified: true,
      passwordVerified: true,
      phoneNumberVerified: true,
    });
    return createTechVendor;

  } catch (error) {
    console.error("Error creating Firebase Auth tech vendor:", error);
    throw error;
  }
};
const createVendor = async ({ firebaseReferenceId, data }) => {
  try {
    const vendorCollection = db.collection(COLLECTIONS.VENDOR);
    
    await vendorCollection.doc(firebaseReferenceId).set({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),

    });

    const vendorDoc = await vendorCollection.doc(firebaseReferenceId).get();
    if(vendorDoc.exists)
    {
      const vendor = vendorDoc.data();
      return {vendor};
    }
    else {
    console.log('Error: Vendor document does not exist');
    return null; 
    }
  
  } catch (error) {
    console.error("Error creating Vendor:", error);
    throw error;
  }
};

module.exports = {
  createFirebaseAuthTechVendor,
  createVendor,
};