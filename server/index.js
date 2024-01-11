require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { default: axios } = require('axios');
const PORT = process.env.SERVER_PORT || 3001;
const { google } = require('googleapis');
const { authorize } = require('./authenticate');
const authController = require('./controllers/authController');
const labelController = require('./controllers/labelController');
const getMessagesController = require('./controllers/getMessagesController');

app.use(express.json());
app.use(cors());

app.get('/authorize', authController);
app.post('/checkLabel', labelController);
app.post('/getMessagesFromLabel', getMessagesController);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
