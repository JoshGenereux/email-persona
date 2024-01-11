require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { default: axios } = require('axios');
const PORT = process.env.SERVER_PORT || 3001;
const { google } = require('googleapis');
const { authorize } = require('./authenticate');

app.use(express.json());
app.use(cors());

app.get('/authorize', async (req, res) => {
  try {
    const auth = await authorize();
    const gmail = google.gmail({ version: 'v1', auth });

    const response = await gmail.users.labels.list({
      userId: 'me',
    });

    const labels = response.data.labels;
    res.json({ labels });
  } catch (error) {
    console.error('Unable to authorize gmail - ', error.message);
    res
      .status(500)
      .json({ success: false, message: 'Unable to authorize gmail account' });
  }
});

app.post('/getLabel', async (req, res) => {
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
});

app.post('/getMessagesFromLabel', async (req, res) => {
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
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
