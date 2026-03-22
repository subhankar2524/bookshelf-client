import React from "react";
import { Outlet } from "react-router-dom";
// import "../styles/layout.css";

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <main className="auth-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;

