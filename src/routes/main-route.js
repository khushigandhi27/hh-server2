const express = require('express');
const routers = express.Router();
const {getFileSignedUrl} = require('../common/get-signed-url');

const adminRoutes = require('../routes/admin/admin-route');
const categoryRoutes = require('../routes/category-route/category-route-index');
const productRoutes = require('../routes/product-route/product-route');
const vendorRoutes = require('../routes/vendor-route/vendor-route');
const customerRoutes = require('../routes/customer-route/customer-route-index');
const savedRoutes = require('../routes/saved-route/saved-route-index');
const bannerRoutes = require('./banners-route/banner-route-index');
routers.get('/getSignedUrl',getFileSignedUrl);

routers.use('/admin',adminRoutes);
routers.use('/category',categoryRoutes);
routers.use('/product',productRoutes);
routers.use('/vendor',vendorRoutes);
routers.use('/customer',customerRoutes);
routers.use('/saved',savedRoutes);
routers.use('/banners',bannerRoutes);

module.exports = routers; 