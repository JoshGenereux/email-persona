const { google } = require('googleapis');
const { authorize } = require('../authenticate');

function filterOnlySentMessages(body) {
  // TODO, figure out every combination of the reply date/time stamps...

  // regex containing who/from/sent etc to filter out who its replying to
  const replyRegex =
    /^(From:|Sent:|To:|Cc:|Subject:|\w+\s\w+\s<\S+>)|^\s*>|^\s*\w+\s*@\S+\s*>?\s*wrote:|^\s*On\s+\w+\s*,?\s*\w+\s+\d{1,2}(,?\s+\d{4})?\s*at\s+\d{1,2}:\d{1,2}\s*(AM|PM)?\s*\w+\s*</i;

  // spliting the text up into lines after each linebreak
  const lines = body.split('\r\n');

  // filtering out the regex from each line
  let filteredLines = lines.filter((line) => !replyRegex.test(line.trim()));

  // filtering out the '>' from each line
  const startIndex = lines.findIndex((line) => line.startsWith('>'));
  const mainBodyLines =
    startIndex !== -1 ? filteredLines.slice(0, startIndex) : filteredLines;

  console.log(mainBodyLines);
  const mainBody = mainBodyLines.join('\n').trim();

  return mainBody;
}

function extractEmailText(message) {
  // extracting the text from each email
  if (message.payload && message.payload.parts) {
    // if it has a payload and if each payload(email) has a {parts}
    const parts = message.payload.parts;
    const textType = parts.find((part) => part.mimeType === 'text/plain');

    // if the tex type is text/plain
    if (textType) {
      // converting from Base64 to plain text
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
    // if there is a body, a payload and data (if there is only one message) then it still works
    const text = Buffer.from(message.payload.body.data, 'Base64').toString();
    const filteredText = filterOnlySentMessages(text);
    return filteredText;
  } else {
    return 'No Text Body';
  }
}

const getMessageWithIDController = async (req, res) => {
  try {
    const messageID = req.body.message.id;

    // aurthorize gmail OAuth2.0
    const auth = await authorize();
    const gmail = google.gmail({ version: 'v1', auth });

    const response = await gmail.users.messages.get({
      userId: 'me',
      id: messageID,
    });

    // extract the text from the email, using above functions
    const extractedText = extractEmailText(response.data);

    res.status(200).send(extractedText);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to retrieve message from server',
    });
    console.log(error);
  }
};

module.exports = getMessageWithIDController;
