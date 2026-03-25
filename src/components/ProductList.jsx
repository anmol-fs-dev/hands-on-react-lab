import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesRating = product.rating.rate >= ratingFilter;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading premium products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong.</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">Retry</button>
      </div>
    );
  }

  return (
    <div className="product-container">
      <header className="product-header">
        <h1>Discover Top Products</h1>
        <p>Curated just for you from the Fake Store API</p>
      </header>

      <div className="controls-bar">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        <div className="filter-controls">
          <span>Rating:</span>
          <div className="filter-options">
            {[0, 3, 4, 4.5].map((rate) => (
              <button
                key={rate}
                className={`filter-btn ${ratingFilter === rate ? 'active' : ''}`}
                onClick={() => setRatingFilter(rate)}
              >
                {rate === 0 ? 'All' : `${rate}+ ⭐`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="image-container">
              <img src={product.image} alt={product.title} loading="lazy" />
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <div className="product-rating-tiny">
                ⭐ {product.rating.rate} ({product.rating.count})
              </div>
            </div>
            <div className="product-overlay">
              <button className="view-btn" onClick={() => navigate(`/product/${product.id}`)}>View Details</button>
            </div>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="empty-filter">
          <p>No products match your current filtering criteria.</p>
          <button className="retry-btn" onClick={() => {
            setRatingFilter(0);
            setSearchQuery('');
          }}>Clear All Filters</button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
