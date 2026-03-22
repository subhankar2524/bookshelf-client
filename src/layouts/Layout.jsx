import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
// import "../styles/layout.css";

const Layout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;


