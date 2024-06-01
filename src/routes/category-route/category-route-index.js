const express = require('express');

const firebaseAuthentication = require('../../middleware/firebaseAuthentication');

const validateSchema = require('../../validators/validator');
const {categoryImage} = require('../../controllers/category-controller/categoryImage-controller');
const createCategoryController = require('../../controllers/category-controller/create-category-controller');
const createCategoryValidator = require('../../validators/category/create-category-validator');
const createStarredCategoryController = require('../../controllers/category-controller/starred-category-controller');
const createStarredCategoryValidator = require('../../validators/starred/create-starred-category-validtaor');

const { displayCategoryProductsController, displayCategoryListController } = require('../../controllers/category-controller/category-controller-index');

const router = express.Router();

router.post('/createCategory',firebaseAuthentication,createCategoryValidator,validateSchema,createCategoryController);
router.post('/categoryImage',categoryImage);
router.post('/starred',createStarredCategoryValidator,validateSchema,createStarredCategoryController);
router.get('/display-category-products',firebaseAuthentication,displayCategoryProductsController);
router.get('/display-category-list',firebaseAuthentication,displayCategoryListController);
module.exports = router;