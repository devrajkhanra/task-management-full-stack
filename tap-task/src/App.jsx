import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/outline/layout/Layout";
import Login from "./components/auth/login/Login";
import SignupPage from "./components/auth/signup/Signup";
import Logout from "./components/auth/logout/Logout";

function App() {
  const [activeView, setActiveView] = useState("overview");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout activeView={activeView} onNavigate={setActiveView} />
          }
        />
        {/* Auth Routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
