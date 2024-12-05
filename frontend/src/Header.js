// Header.js
import React from 'react';
import './Header.css';

const Header = ({ cartCount }) => {
  return (
    <header className="header">
      <h1>My Shop</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/cart">Cart ({cartCount})</a>
      </nav>
    </header>
  );
};
