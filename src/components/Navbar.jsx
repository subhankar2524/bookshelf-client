import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Bookshelf</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/my-books" className="nav-link">My Books</Link>
        <Link to="/login" className="nav-link">Login / Signup</Link>
        <Link to='/profile'>Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;