//packages
import { Routes, Route } from "react-router-dom";

//components
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import UserBookingsPage from "./components/UserBookingsPage";
import Navbar from "./components/Navbar";

//styles
import "./styles/App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bookings" element={<UserBookingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
