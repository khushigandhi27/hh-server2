const firebaseAdmin = require('../../config/firebase-config');
const generateResponse = require('../../utils/generate-response');
const { createAdminAccount} = require('../../database-functions/create-admin');

const createAdminController = async (req, res, next) => {
    try {
        const {
            body: { 
                firebaseAdminId = '',
                name='',
                email = '',

            },
        } = req;
        const adminCollection = firebaseAdmin.firestore().collection('admin');
        
        

        
            const emailSnapshot = await adminCollection.where('email', '==', email).get();
            if (!emailSnapshot.empty) {
                return res.status(400).send(generateResponse('email is already existed'));
            }
        
            const timestamp = new Date();
        const adminData = {
            aid: firebaseAdminId,
           name,
           email,
           createdAt: timestamp,
           updatedAt: timestamp, 

        };

      const {admin}=  await createAdminAccount(adminData);
        
        return res.send(generateResponse('User account created successfully', {admin}));
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

module.exports = createAdminController;