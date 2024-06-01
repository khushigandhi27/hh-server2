const {createVendor, createFirebaseAuthTechVendor} = require('../../database-functions/vendor/create-vendor');
const firebaseAdmin = require('../../config/firebase-config');
const generateResponse = require('../../utils/generate-response');

const createVendorController = async(req,res,next) => 
{
    try
    {
        const 
        {
             body:
             {
                name='',
                email='',
                address='',
                phoneNumber='',
                password = '',
                categoryName = '',
                bio = '',
                businessName = '',
                image = ''
             },           
        }=req;

        if (!email && !phoneNumber) {
          return res.status(400).send(generateResponse('Error: Please enter either email or phoneNo'));
      }
      
      const usersCollection = firebaseAdmin.firestore().collection('customers');

      if (email !== '') {
          const emailSnapshot = await usersCollection.where('email', '==', email).get();
          if (!emailSnapshot.empty) {
              return res.status(400).send(generateResponse('Error: Email already exists in the database', null));
          }
      }

      if (phoneNumber !== '') {
          const phoneNoSnapshot = await usersCollection.where('phoneNumber', '==', phoneNumber).get();
          if (!phoneNoSnapshot.empty) {
              return res.status(400).send(generateResponse('Error: Phone already exists in the database', null));
          }
      }
        const timestamp = new Date();

        const vendorData = 
        {
          vendorId: '',
          name,
          email,
          address,
          phoneNumber,
          categoryName,
          bio,
          businessName,
          image,
          createdAt: timestamp,
          updatedAt: timestamp, 
        }

        const createdUser = await createFirebaseAuthTechVendor({ name, email, phoneNumber, password });
        vendorData.vendorId = createdUser.uid;
       
        const {vendor} = await createVendor({ firebaseReferenceId: createdUser.uid, data: vendorData });

        vendor.password = password;

        return res.send(generateResponse('vendor created',{vendor}));
    }
    catch(error)
    {
      return next(error);
    }
};

module.exports = createVendorController;