//packages
import { Routes, Route } from "react-router-dom";

//components
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";

//styles
import "./styles/App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
