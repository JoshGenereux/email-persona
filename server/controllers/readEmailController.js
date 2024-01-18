const { OpenAI } = require('openai');

const key = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: key });

const readEmailController = async (req, res) => {
  try {
    const message = req.body.message;
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'This is a test' }],
      model: 'gpt-3.5-turbo',
    });
    console.log(response.data);
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
