import './App.css';

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('submit');
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
