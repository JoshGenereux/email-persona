import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../header/Header';
import styles from './home.module.scss';

const URL = 'http://localhost:5432';

function Home() {
  const [list, setList] = useState([]);
  const [clicked, setClicked] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [labelLoading, setLabelLoading] = useState(false);
  const [emails, setEmails] = useState([]);

  const handleEmailButton = async () => {
    try {
      setList([]);
      setEmails([]);
      setLabelLoading(true);
      const response = await axios.get(`${URL}/authorize`);
      setList([...response.data.labels]);
      setLabelLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLabelClick = async (e) => {
    e.preventDefault();
    const label = e.target.id;
    setClicked(label);
    await getLabelInfo(label);
  };

  const getLabelInfo = async (label) => {
    try {
      const body = {
        label: label,
      };
      const response = await axios.post(`${URL}/checkLabel`, body);
      if (response.data.id === label) {
        fetchMessages(label);
      }
    } catch (error) {
      console.log('Failed to fetch Label - ', error.message);
    }
  };

  const fetchMessages = async (label) => {
    try {
      setEmailLoading(true);
      const body = {
        label: label,
      };
      const response = await axios.post(`${URL}/getMessagesFromLabel`, body);
      const messageArray = await response?.data?.messages;
      if (messageArray) {
        messageArray.map((el) => getMessageWithID(el));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMessageWithID = async (message) => {
    try {
      const body = {
        message: message,
      };
      const response = await axios.post(`${URL}/getMessageWithID`, body);
      // TODO handle this in the back end
      if (response && response.data !== 'No Text Content') {
        setEmails((prevMail) => [...prevMail, response]);
        console.log(response.data);
      }
      setEmailLoading(false);
    } catch (error) {
      console.log('Unable to retrieve message from array or server - ', error);
    }
  };

  async function handleEmailclick(e) {
    try {
      // taking the email text and removing the number in front of it.
      const text = e.target.innerText.split(' ');
      text.shift();
      const removedNum = text.join(' ');
      // adding the text into the body, with the key of message.
      const body = {
        message: removedNum,
      };

      const response = await axios.post(`${URL}/readEmail`, body);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleBatchClick() {
    try {
      const body = {
        batchMessages: emails.map((email) => email.data),
      };

      const response = await axios.post(`${URL}/readEmail`, body);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGoogleNPL = async () => {
    try {
      const text = 'testing';
      const body = {
        text: text,
      };
      const response = await axios.post(`${URL}/NPLClient`, body);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.container}>
        <div className={styles.left}>
          <button
            className={styles.getLabelsButton}
            onClick={handleEmailButton}
          >
            email
          </button>

          <div className={styles.labelList}>
            <div className={styles.loading}>
              {labelLoading && (
                <div
                  className={`${styles['lds-ring']} ${styles['lds-ring-land']}`}
                >
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
            </div>
            {!!list.length &&
              list.map((li) => (
                <div
                  className={styles.label}
                  id={li.id}
                  key={li.id}
                  onClick={handleLabelClick}
                >
                  {li.id}
                </div>
              ))}
          </div>
        </div>
        <div className={styles.right}>
          <button onClick={handleGoogleNPL}>Google NLP</button>
          <button onClick={handleBatchClick}>Batch Sentiment</button>
          <div className={styles.emailList}>
            <div className={styles.loading}>
              {emailLoading && (
                <div
                  className={`${styles['lds-ring']} ${styles['lds-ring-land']}`}
                >
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
            </div>
            {!!emails &&
              emails.map((mail, i) => (
                <div
                  className={styles.email}
                  key={i}
                  onClick={handleEmailclick}
                  id={`email-${i + 1}`}
                >
                  {`${i + 1}. `}
                  {mail.data}
                </div>
              ))}
          </div>
        </div>
      </div>
      <Link to="/">
        <button>Logout</button>
      </Link>
    </div>
  );
}

export default Home;
