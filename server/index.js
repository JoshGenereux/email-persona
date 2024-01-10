require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { default: axios } = require('axios');
const PORT = process.env.SERVER_PORT || 3001;
const { API_KEY: key } = process.env;
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');
const { authorize, listLabels } = require('./authenticate');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

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

    // Send the labels as JSON in the response
    res.json({ labels });
  } catch (error) {
    console.error('Error', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
