//styles
import ".././styles/HomePage.css";

function HomePage() {
  function getTimeSlots() {
    fetch("https://park-it-omega.vercel.app/time-slots")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <button onClick={getTimeSlots}>Click Me</button>
    </div>
  );
}

export default HomePage;
