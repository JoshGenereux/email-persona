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
    console.error('Error', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/getLabel', async (req, res) => {
  // const auth = await authorize();
  // const gmail = google.gmail({ version: 'v1', auth});
  // const response = await gmail.users.labels.get({
  //   userId: 'me',
  //   id: req.label
  // })
  console.log('request - ', req.body);
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
