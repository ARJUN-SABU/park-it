import "./App.css";

function App() {
  function getTimeSlots() {
    fetch("https://park-it-omega.vercel.app/time-slots").then((result) =>
      console.log(result)
    );
  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <button onClick={getTimeSlots}>Click Me</button>
    </div>
  );
}

export default App;
