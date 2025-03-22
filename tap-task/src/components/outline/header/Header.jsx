import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-logo">TapTask</h1>
      </div>

      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input type="search" placeholder="Search..." className="search-input" />
      </div>

      <div className="header-right">
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home" className="nav-link active">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="icon-button">
            <FontAwesomeIcon icon={faBell} />
          </button>
          <div className="user-profile">
            <button className="profile-button">
              <FontAwesomeIcon icon={faUser} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
