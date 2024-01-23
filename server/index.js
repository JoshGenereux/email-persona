require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.SERVER_PORT || 3001;
const authController = require('./controllers/authController');
const labelController = require('./controllers/labelController');
const getMessagesController = require('./controllers/getMessagesController');
const getMessageWithIDController = require('./controllers/getMessageWithIDController');
const readEmailController = require('./controllers/readEmailController');
const NPLController = require('./controllers/NPLController');

app.use(express.json());
app.use(cors());

app.get('/authorize', authController);
app.post('/checkLabel', labelController);
app.post('/getMessagesFromLabel', getMessagesController);
app.post('/getMessageWithID', getMessageWithIDController);
app.post('/readEmail', readEmailController);
app.post('/NPLClient', NPLController);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
