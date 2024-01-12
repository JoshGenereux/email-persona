import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/header/Header';
import styles from './App.module.scss';

const URL = 'http://localhost:5432';

function App() {
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
      if (response) {
        setEmails((prevMail) => [...prevMail, response]);
        console.log(response.data);
      }
      setEmailLoading(false);
    } catch (error) {
      console.log('Unable to retrieve message from array or server - ', error);
    }
  };

  return (
    <div className="App">
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
              emails.map((mail, i) => <div key={i}>{mail.data.snippet}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
