import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" style={{ fontSize: '100px' }}>
          <span className="brand-icon">🛍️</span> FakeStore
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/cart">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
        </ul>
        <div className="navbar-actions">
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/cart" className="cart-btn-link">
            <button className="cart-btn">
              Cart <span className="cart-badge">{cartCount}</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
