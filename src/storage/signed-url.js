const admin  = require('../config/firebase-config');
const serviceAccount = require('../config/service-account/data1.json');
const defaultLogger = require('../logger');

const storage = admin.storage();

const putSignedUrl = async (fileName, fileType, ctx) => {
  try {
    const options = {
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: fileType,
    };

    const storageBaseUrl = serviceAccount.firebase_bucket_url;

    const filePath = `${fileName}`;

    const [signedUrl] = await storage.bucket(storageBaseUrl).file(filePath).getSignedUrl(options);

    return signedUrl;
  } catch (error) {
    defaultLogger(`Error from putSignedUrl > ${error}`, ctx, 'error');
    throw error;
  }
};

const getSignedUrl = async fileName => {
  try {
    const options = {
      action: 'read',
      expires: '5999-09-18',
    };

    const [signedUrl] = await storage.bucket(serviceAccount.firebase_bucket_url).file(fileName).getSignedUrl(options);
    return signedUrl;
  } catch (error) {
    defaultLogger(`Error from getSignedUrl > ${error}`);
    throw error;
  }
};

module.exports = { putSignedUrl, getSignedUrl };