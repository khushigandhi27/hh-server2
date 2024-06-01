const firebaseAdmin = require('../../config/firebase-config');
const generateResponse = require('../../utils/generate-response');
const { createCustomer, createFirebaseAuthTechCustomer } = require('../../database-functions/customer/create-customer');

const createCustomerController = async (req, res, next) => {
    try {
        const {
            body: {
                firstName = '', 
                lastName = '', 
                email = '', 
                phoneNumber = '',
                password = '',
                image = '',
            },
        } = req;

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

        const customerData = {
            id: '',
            firstName,
            lastName,
            email,
            phoneNumber,
            image,
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        const createdUser = await createFirebaseAuthTechCustomer({ firstName, email, phoneNumber, password });
        customerData.id = createdUser.uid;
       
        const {customer} = await createCustomer({ firebaseReferenceId: createdUser.uid, data: customerData });

        customer.password = password;

        return res.send(generateResponse('customer created',{customer}));

    } catch (error) {
        return next(error);
    }
};

module.exports = createCustomerController;
