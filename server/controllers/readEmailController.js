const AWS = require('aws-sdk');
const key = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: key,
  secretAccessKey: secretKey,
  region: 'us-east-1',
});
const comprehend = new AWS.Comprehend();

const sentimentPromise = (params) => {
  return new Promise((resolve, reject) => {
    comprehend.detectSentiment(params, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

const targetedSentimentPromise = (params) => {
  return new Promise((resolve, reject) => {
    comprehend.detectTargetedSentiment(params, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

const batchTargetedSentimentPromise = (params) => {
  return new Promise((resolve, reject) => {
    comprehend.batchDetectSentiment(params, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

const readEmailController = async (req, res) => {
  try {
    const params = {
      LanguageCode: 'en',
      Text: req.body.message,
    };
    const batchParams = {
      LanguageCode: 'en',
      TextList: req.body.batchMessages,
    };
    console.log(batchParams);
    // const sentiment = await sentimentPromise(params);
    // const targetedSentiment = await targetedSentimentPromise(params);
    const batchTargetedSentiment = await batchTargetedSentimentPromise(
      batchParams
    );
    console.log(batchTargetedSentiment);
    res.status(200).send(batchTargetedSentiment);
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
