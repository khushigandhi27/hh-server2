const { query } = require('express');
const admin = require('../config/firebase-config');
const {COLLECTIONS} = require('../constants/collection-constants');
const db = admin.firestore();

const createProduct = async (productData) =>
{
    try
    {
        await db.collection(COLLECTIONS.PRODUCTS).doc(productData.productId).set(productData);
        const snapshot = await db.collection(COLLECTIONS.PRODUCTS).where('productId','==',productData.productId).get();
        let productsCreated = {};
        snapshot.forEach(doc => {
            productsCreated = doc.data();
        });
        return {productsCreated};     
    }
    catch(error)
    {
       return error;
    }
};
module.exports = {createProduct};