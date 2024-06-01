const path = require('path');
const { getType } = require('mime');

const { putSignedUrl } = require('../../storage/signed-url');
const { checkIfImageFile } = require('../../utils/check-extensions');

const { STORAGE_PREFIX_KEY } = require('../../utils/constants');
const generateResponse = require('../../utils/generate-response');
const getMessage = require('../../utils/get-message');

const vendorImage = async (req, res) => {
  try {
    const { fileName } = req.body;
    const mimeType = getType(fileName);
    const fileExtension = path.extname(fileName);

    if (!checkIfImageFile(fileExtension)) {
      return generateResponse(getMessage('FILE_NOT_SUPPORTED'), 400);
    }
   
    const storagePrefix = STORAGE_PREFIX_KEY.VENDOR;

    const defaultMenuPrefix = `${storagePrefix}/${fileName}`;
    const signedUrl = await putSignedUrl(defaultMenuPrefix, mimeType);

    return res.send({
      signedUrl,
      getUrl: defaultMenuPrefix,
      fileName,
    });
  } catch (error) {
    const errorResponse = generateResponse(error.message, 500);
    return res.status(500).send(errorResponse);
  }
};

module.exports = {vendorImage};