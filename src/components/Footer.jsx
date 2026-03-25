import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>FakeStore</h3>
          <p>Your premium destination for high-quality products from the Fake Store API.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Shop</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FakeStore API Demo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
