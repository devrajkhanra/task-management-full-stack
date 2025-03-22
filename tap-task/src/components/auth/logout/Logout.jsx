import React from "react";
import "./Logout.css"; // Shared CSS for auth components

const Logout = () => {
  const handleLogout = () => {
    console.log("User logged out");
    // Add your logout logic here (e.g., clear session/token)
  };

  return (
    <div className="auth-container">
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout} className="auth-button">
        Logout
      </button>
    </div>
  );
};

export default Logout;
