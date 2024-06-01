const { getSignedUrl } = require('../storage/signed-url');
const generateResponse = require('../utils/generate-response');

const getFileSignedUrl = async (req, res) => {
  try {
    const { filePath } = req.query;

    if (!filePath) {
      return res.status(400).send(generateResponse('filePath is required'));
    }

    const signedUrl = await getSignedUrl(filePath);

    return res.json({
      signedUrl,
    });
  } catch (error) {
    return res.status(500).send(generateResponse(`Error from getFileSignedUrl > ${error}`, null, 'error'));
  }
};

module.exports = {getFileSignedUrl};