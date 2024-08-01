import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
