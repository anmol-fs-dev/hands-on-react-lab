import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=4');
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Modern Style for the Digital Age</h1>
          <p>Exquisite products curated from the finest sources. Experience premium quality with every click.</p>
          <div className="hero-btns">
            <Link to="/products" className="checkout-btn hero-btn">Shop Collection</Link>
            <a href="#featured" className="continue-shopping hero-btn secondary">View Featured</a>
          </div>
        </div>
        <div className="hero-overlay-glow"></div>
      </section>

      <section id="featured" className="featured-section">
        <div className="section-header">
          <h2>Featured Collection</h2>
          <Link to="/products" className="view-all">View All Products &rarr;</Link>
        </div>

        {isLoading ? (
          <div className="loader-container min-h-20">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="image-container">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
                <div className="product-overlay">
                  <Link to={`/product/${product.id}`} className="view-btn-link">
                    <button className="view-btn">View Details</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Join the FakeStore Community</h2>
          <p>Get early access to new drops and exclusive offers.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button className="checkout-btn">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
