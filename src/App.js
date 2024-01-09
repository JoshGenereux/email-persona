import { useState } from 'react';
import './App.css';
import axios from 'axios';

const URL = 'http://localhost:5432';

function App() {
  const [userText, setUserText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${URL}/gmail`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input placeholder="email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
