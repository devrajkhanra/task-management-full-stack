import React from "react";
import Main from "../main/Main";
import Sidebar from "../sidebar/Sidebar";
import "./Layout.css";
import Header from "../header/Header";

const Layout = ({ activeView, onNavigate }) => {
  return (
    <>
      <Header />
      <div className="container">
        <Sidebar activeView={activeView} onNavigate={onNavigate} />
        <Main activeView={activeView} />
      </div>
    </>
  );
};

export default Layout;
