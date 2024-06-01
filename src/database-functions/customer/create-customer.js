const admin = require("../../config/firebase-config");
const { COLLECTIONS } = require("../../constants/collection-constants");
const db = admin.firestore();

const createFirebaseAuthTechCustomer = async ({ name, email, phoneNumber, password }) => {
  try {
    const createTechCustomer = await admin.auth().createUser({
      displayName: name,
      email: email || undefined,
      phoneNumber: phoneNumber || undefined,
      password: password,
      emailVerified: true,
      passwordVerified: true,
      phoneNumberVerified: true,
    });
    return createTechCustomer;

  } catch (error) {
    console.error("Error creating Firebase Auth tech customer:", error);
    throw error;
  }
};
const createCustomer = async ({ firebaseReferenceId, data }) => {
  try {
    const customerCollection = db.collection(COLLECTIONS.CUSTOMERS);
    
    await customerCollection.doc(firebaseReferenceId).set({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),

    });

    const customerDoc = await customerCollection.doc(firebaseReferenceId).get();
    if(customerDoc.exists)
    {
      const customer = customerDoc.data();
      return {customer};
    }
    else {
    console.log('Error: Customer document does not exist');
    return null; 
    }
  
  } catch (error) {
    console.error("Error creating Customer:", error);
    throw error;
  }
};

module.exports = {
  createFirebaseAuthTechCustomer,
  createCustomer,
};