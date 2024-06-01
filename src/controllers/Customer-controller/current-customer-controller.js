const defaultLogger = require('../../logger');
const generateResponse = require('../../utils/generate-response');

const getLoginCustomerController = async (req, res, next) => {
    try {
        console.log(req.user);
        const user = req.user;
        console.log(user);
        return user;
    } catch (error){
        return next(error);
    }
};

module.exports = getLoginCustomerController;