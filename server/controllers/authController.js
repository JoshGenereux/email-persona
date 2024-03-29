const { google } = require('googleapis');
const { authorize } = require('../authenticate');

const authController = async (req, res) => {
  try {
    const auth = await authorize();
    const gmail = google.gmail({ version: 'v1', auth });

    const response = await gmail.users.labels.list({
      userId: 'me',
    });

    const labels = response.data.labels;
    res.status(200).json({ labels });
  } catch (error) {
    console.error('Unable to authorize gmail - ', error.message);
    res.status(400).json({
      success: false,
      message: 'Unable to authorize gmail account',
      error,
    });
  }
};

module.exports = authController;
