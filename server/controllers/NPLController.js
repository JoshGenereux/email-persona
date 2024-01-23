const { LanguageServiceClient } = require('@google-cloud/language');

const NPLController = async (req, res) => {
  try {
    const client = new LanguageServiceClient({
      keyFilename: './nplcredentials.json',
    });

    const { text } = req.body;

    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    const response = await client.analyzeSentiment({
      document: document,
    });
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = NPLController;
