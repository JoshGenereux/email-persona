const { google } = require('googleapis');
const { authorize } = require('../authenticate');

function filterOnlySentMessages(body) {
  const lines = body.split('\r\n');
  const startIndex = lines.findIndex((line) => line.startsWith('>'));
  const mainBodyLines = startIndex !== -1 ? lines.slice(0, startIndex) : lines;
  const mainBody = mainBodyLines.join('\n').trim();
  return mainBody;
}

function extractEmailText(message) {
  const date = message.payload.headers.find(
    (header) => header.name === 'Date'
  ).value;
  const to = message.payload.headers.find(
    (header) => header.name === 'To'
  ).value;

  if (message.payload && message.payload.parts) {
    const parts = message.payload.parts;
    const textType = parts.find((part) => part.mimeType === 'text/plain');
    if (textType) {
      const text = Buffer.from(textType.body.data, 'Base64').toString();
      const filtered = filterOnlySentMessages(text);
      return filtered;
    } else {
      return 'No Text Content';
    }
  } else if (
    message.payload &&
    message.payload.body &&
    message.payload.body.data
  ) {
    return Buffer.from(message.payload.body.data, 'Base64').toString();
  } else {
    return 'No Text Body';
  }
}

const getMessageWithIDController = async (req, res) => {
  try {
    const messageID = req.body.message.id;
    const auth = await authorize();
    const gmail = google.gmail({ version: 'v1', auth });

    const response = await gmail.users.messages.get({
      userId: 'me',
      id: messageID,
    });
    const extractedText = extractEmailText(response.data);

    res.status(200).send(extractedText);
    // res.status(200).send(response.data);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to retrieve message from server',
    });
    console.log(error);
  }
};

module.exports = getMessageWithIDController;
