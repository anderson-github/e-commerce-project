import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>This is our amazing e-commerce platform</p>
          <p>Social Networks</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@eshop.com</p>
          <p>Phone: (555) 123-4567</p>
          <p> X - Instagram - FaceBook </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
