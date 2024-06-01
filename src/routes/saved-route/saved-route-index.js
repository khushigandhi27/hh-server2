const express = require('express');

const firebaseAuthentication = require('../../middleware/firebaseAuthentication');

const {createSavedProductsController,displaySavedProductsController} = require('../../controllers/saved-controller/saved-controller-index');
const createSavedProductsValidator = require('../../validators/saved/create-saved-products-validator');
const validateSchema = require('../../validators/validator');

const router = express.Router();

router.post('/create-saved-products',firebaseAuthentication,createSavedProductsValidator,validateSchema,createSavedProductsController);
router.get('/display-saved-products',firebaseAuthentication,displaySavedProductsController);

module.exports = router;