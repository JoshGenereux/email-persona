const { google } = require('googleapis');
const { authorize } = require('../authenticate');

const getMessagesController = async (req, res) => {
  try {
    const label = req.body.label;
    const auth = await authorize();
    const gmail = google.gmail({ version: 'v1', auth });
    const response = await gmail.users.messages.list({
      userId: 'me',
      labelIds: label,
    });
    res.status(200).send(response.data);
  } catch (error) {
    console.log('Unable to access label - ', error);
    res.status(400).json({ success: false, message: 'Unable to access label' });
  }
};

module.exports = getMessagesController;
