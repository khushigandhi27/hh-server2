const express = require('express');

const firebaseAuthentication = require('../../middleware/firebaseAuthentication');

const getBannerController = require('../../controllers/banners-controller/banners-controller-index');

const router = express.Router();

router.get('/get-banners',firebaseAuthentication,getBannerController);

module.exports = router;