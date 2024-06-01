const express = require('express');

const firebaseAuthentication = require('../../middleware/firebaseAuthentication');

const createProductController = require('../../controllers/product-controller/create-product-controller');

const {productImage} = require('../../controllers/product-controller/product-image');

const createProductValidator = require('../../validators/product/create-product-validator');
const validateSchema = require('../../validators/validator');

const getProductController = require('../../controllers/product-controller/displayProduct-controller');

const deleteProductController = require('../../controllers/product-controller/deleteProducts');
const deleteProductValidator = require('../../validators/product/deleteProduct-validator');

const updateProductController = require('../../controllers/product-controller/updateProduct-controller');
const updateProductValidator= require('../../validators/product/updateProduct-validator');

const { getProductsController, displayProductsByPidController } = require('../../controllers/product-controller/product-controller-index');

const router=express.Router();
router.delete('/deleteProducts', firebaseAuthentication,deleteProductValidator, validateSchema, deleteProductController);
router.get('/getProduct',firebaseAuthentication,getProductController);
router.post('/createProduct',firebaseAuthentication,createProductValidator,validateSchema,createProductController); 
router.post('/productImage',productImage);
router.put('/updateProduct',firebaseAuthentication,updateProductValidator,validateSchema,updateProductController);
router.get('/display-products-home',firebaseAuthentication,getProductsController);
router.get('/display-products-by-pid',firebaseAuthentication,displayProductsByPidController);
router.get('/search-products',firebaseAuthentication,getProductsController);
module.exports=router;