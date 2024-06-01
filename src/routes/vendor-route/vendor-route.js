const express = require('express');

const firebaseAuthentication = require('../../middleware/firebaseAuthentication');

const createVendorController = require('../../controllers/vendor-controller/create-vendor-controller');
const getVendor = require('../../controllers/vendor-controller/getVendor-controller');
const createVendorValidator = require('../../validators/vendor/create-vendor-validator');
const {vendorImage} = require('../../controllers/vendor-controller/vendorImage-controller');
const displayVendorByVendorIdController = require('../../controllers/vendor-controller/displayVendorsByVendorIdController');

const validateSchema = require('../../validators/validator');
const router = express.Router();

router.get('/getVendor',firebaseAuthentication,getVendor);
router.get('/display-vendors-by-vendorId', firebaseAuthentication, displayVendorByVendorIdController);
router.post('/createVendor',firebaseAuthentication,createVendorValidator,validateSchema,createVendorController);
router.post('/vendorImage',vendorImage);

module.exports=router;