//packages
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";

//styles
import "./styles/App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
