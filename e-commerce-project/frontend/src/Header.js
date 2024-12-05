import React, { useState, useEffect } from 'react';
import './styles.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <nav className="nav-container">
        <div className="logo">
          <h1>Your Logo</h1>
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <div className="mobile-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};


export default Header;