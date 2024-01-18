const key = process.env.OPENAI_API_KEY;

const readEmailController = async (req, res) => {
  try {
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
