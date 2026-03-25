import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="app-main">
            <Navbar />
            <main className="content-wrapper">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
