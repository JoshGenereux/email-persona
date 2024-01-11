const { google } = require('googleapis');
const { authorize } = require('../authenticate');

const labelController = async (req, res) => {
  try {
    const label = req.body.label;
    const auth = await authorize();
    const gmail = google.gmail({ version: 'v1', auth });
    const response = await gmail.users.labels.get({
      userId: 'me',
      id: label,
    });
    res.status(200).send(response.data);
  } catch (error) {
    console.log('Unable to retrieve label contents - ', error);
    res
      .status(400)
      .json({ success: false, message: 'Unable to retrieve label contents' });
  }
};

module.exports = labelController;
