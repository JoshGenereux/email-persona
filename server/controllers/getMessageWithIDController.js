const { google } = require('googleapis');
const { authorize } = require('../authenticate');

const getMessageWithIDController = async (req, res) => {
  try {
    const messageID = req?.body?.message?.id;
    console.log(messageID);
    const auth = await authorize();
    const gmail = google.gmail({ version: 'v1', auth });
    const response = await gmail.users.messages.get({
      userId: 'me',
      id: messageID,
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to retrieve message from server',
    });
    console.log(error);
  }
};

module.exports = getMessageWithIDController;
