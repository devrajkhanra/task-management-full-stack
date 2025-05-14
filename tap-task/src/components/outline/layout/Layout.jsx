// import React from "react";
// import Main from "../main/Main";
// import Sidebar from "../sidebar/Sidebar";
// import "./Layout.css";
// import Header from "../header/Header";

// const Layout = ({ activeView, onNavigate }) => {
//   return (
//     <>
//       <Header />
//       <div className="container">
//         <Sidebar activeView={activeView} onNavigate={onNavigate} />
//         <div className="main-wrapper">
//           <Main activeView={activeView} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Layout;

import React, { useState } from "react";
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
        <div className="main-wrapper">
          <Main activeView={activeView} />
        </div>
      </div>
    </>
  );
};

export default Layout;
