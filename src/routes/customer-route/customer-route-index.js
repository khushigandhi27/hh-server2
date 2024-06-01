const express = require('express');

const firebaseAuthentication = require('../../middleware/firebaseAuthentication');

const displayCustomerController = require('../../controllers/Customer-controller/getCustomerController');
const {getLoginCustomerController} = require('../../controllers/customer-controller/customer-controller-index');
const createCustomerController = require('../../controllers/Customer-controller/create-customer-controller');

const { customerImage } = require('../../controllers/Customer-controller/customerImage-controller');

const { createCustomerValidator } = require('../../validators/customer/customer-validator-index');

const validateSchema = require('../../validators/validator');

const router = express.Router();

router.get('/getCustomer',firebaseAuthentication,displayCustomerController);
router.post('/create-customer',createCustomerValidator,validateSchema,createCustomerController);
router.get('/get-login-customer',firebaseAuthentication,getLoginCustomerController);
router.post('/customerImage', customerImage);

module.exports = router;