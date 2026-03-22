import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import "../styles/components/navbar.css";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Bookshelf</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        {user ? (
          <>
            <Link to="/my-books" className="nav-link">My Books</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
          </>
        ) : (
          <Link to="/login" className="nav-link">Login / Signup</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;