const { createStarredCategory, deleteStarredCategory } = require('../../database-functions/create-category');
const generateResponse = require('../../utils/generate-response');
const shortId = require('shortid');
const admin = require('../../config/firebase-config');
const {COLLECTIONS} = require('../../constants/collection-constants');
const db = admin.firestore();

const createStarredCategoryController = async (req, res, next) => {
    try {
        const {
            body:{
                 categoryId = '', 
                 isStarred  
                } 
            } = req;
                
        if (!categoryId) {
            return res.status(400).send(generateResponse('Invalid categoryId provided', null, false));
        }

        const isStarredBool = isStarred === true;

        const categoryDoc = await db.collection(COLLECTIONS.CATEGORY).doc(categoryId).get();
        if (!categoryDoc.exists) {
            return res.status(404).send(generateResponse(`Category ID not found: ${categoryId}`, null, false));
        }

        const scid = shortId.generate();
        const data = {
            scid,
            categoryId,
            isStarred: isStarredBool,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        if (isStarredBool) {
            const { starredCategory } = await createStarredCategory(data);
            return res.send(generateResponse('Starred Category successfully', { starredCategory }));
        } else {
            await deleteStarredCategory(categoryId);
            return res.send(generateResponse('Starred category is removed'));
        }
    } catch (error) {
        return next(error);
    }
};

module.exports = createStarredCategoryController;