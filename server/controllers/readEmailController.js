const AWS = require('aws-sdk');
const key = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: key,
  secretAccessKey: secretKey,
  region: 'us-east-1',
});
const comprehend = new AWS.Comprehend();

const readEmailController = async (req, res) => {
  try {
    const params = {
      LanguageCode: 'en',
      Text: req.body.message,
    };

    comprehend.detectSentiment(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Sentiment', data);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error,
      success: false,
      message: 'Could not fetch information from Dandelion',
    });
  }
};

module.exports = readEmailController;
