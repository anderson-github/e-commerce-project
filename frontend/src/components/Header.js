import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';



const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Amazing E-Commerce Website</Link>
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">Products</Link>
        <Link to="/cart" className="nav-link">Cart</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;
