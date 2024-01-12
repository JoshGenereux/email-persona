import { useState } from 'react';
import './App.css';
import axios from 'axios';

const URL = 'http://localhost:5432';

function App() {
  const [list, setList] = useState([]);
  const [clicked, setClicked] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${URL}/gmail`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailButton = async () => {
    console.log('click');
    try {
      const response = await axios.get(`${URL}/authorize`);
      console.log(response.data.labels);
      setList([...response.data.labels]);
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
      console.log(response.data);
    } catch (error) {
      console.log('Unable to retrieve message from array or server - ', error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input placeholder="email" />
        <button type="submit">Submit</button>
      </form>

      <button onClick={handleEmailButton}>email</button>
      <div>
        {list.length &&
          list.map((li) => (
            <div id={li.id} key={li.id} onClick={handleLabelClick}>
              {li.id}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
