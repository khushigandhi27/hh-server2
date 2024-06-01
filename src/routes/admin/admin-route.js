const express = require('express');
const createAdminController = require('../../controllers/admin-controller/create-admin-controller');
const createAdminValidator = require('../../validators/admin/create-admin-validator');
const validateSchema = require('../../validators/validator');
const firebaseAuthentication = require('../../middleware/firebaseAuthentication');
const router= express.Router();
router.post('/create-admin',firebaseAuthentication,createAdminValidator,validateSchema,createAdminController);

module.exports = router;