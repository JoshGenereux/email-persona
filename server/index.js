require('dotenv').config();
const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

const authController = require('./controllers/authController');
const labelController = require('./controllers/labelController');
const getMessagesController = require('./controllers/getMessagesController');
const getMessageWithIDController = require('./controllers/getMessageWithIDController');
const readEmailController = require('./controllers/readEmailController');
const NPLController = require('./controllers/NPLController');
const loginController = require('./controllers/loginController');

app.use(express.json());
app.use(cors());

// TODO for Production... ---> need to get an actual Certificate Authority (CA)
const privateKey = fs.readFileSync(process.env.SSL_SERVER_KEY_PATH, 'utf8');
const certificate = fs.readFileSync(process.env.SSL_SERVER_CERT_PATH, 'utf8');
const credentials = { key: privateKey, cert: certificate };

app.get('/authorize', authController);
app.post('/checkLabel', labelController);
app.post('/getMessagesFromLabel', getMessagesController);
app.post('/getMessageWithID', getMessageWithIDController);
app.post('/readEmail', readEmailController);
app.post('/NPLClient', NPLController);
app.post('/handleInfo', loginController);

// Use the 'https' module to create an HTTPS server

app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
