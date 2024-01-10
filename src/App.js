import { useState } from 'react';
import './App.css';
import axios from 'axios';

const URL = 'http://localhost:5432';

function App() {
  const [list, setList] = useState([]);

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

  const checkList = () => {
    console.log(list);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input placeholder="email" />
        <button type="submit">Submit</button>
      </form>

      <button onClick={handleEmailButton}>email</button>
      <div>{list.length && list.map((li) => <div>{li.id}</div>)}</div>
    </div>
  );
}

export default App;
