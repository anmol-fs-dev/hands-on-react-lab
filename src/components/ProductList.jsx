import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Intentional delay to show skeletons
        await new Promise(resolve => setTimeout(resolve, 1500));
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setIsUsingMockData(false);
      } catch (err) {
        console.warn('API is unreachable, falling back to mock data:', err.message);
        setProducts(mockProducts);
        setIsUsingMockData(true);
        // We don't set error here because we have a fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Reset to first page when filtering or searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, ratingFilter]);

  const filteredProducts = products.filter(product => {
    const matchesRating = product.rating.rate >= ratingFilter;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="product-container">
        <header className="product-header">
          <h1>Discover Top Products</h1>
          <p>Curated just for you from the Fake Store API</p>
        </header>

        <div className="controls-bar">
          <div className="search-bar skeleton"></div>
          <div className="filter-controls skeleton" style={{ width: '300px', height: '40px' }}></div>
        </div>

        <div className="product-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-image skeleton"></div>
              <div className="skeleton-title skeleton"></div>
              <div className="skeleton-text skeleton"></div>
              <div className="skeleton-price skeleton"></div>
            </div>
          ))}
        </div>
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
        {isUsingMockData && (
          <div className="mock-data-indicator">
            <span className="info-icon">ℹ️</span> Currently viewing cached/offline data due to API maintenance.
          </div>
        )}
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
        {currentItems.map((product) => (
          <div key={product.id} className="product-card">
            <div className="image-container">
              <img src={product.image} alt={product.title} loading="lazy" />
            </div>
            {/* <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <div className="product-rating-tiny">
                ⭐ {product.rating.rate} ({product.rating.count})
              </div>
            </div> */}
            <div className="product-overlay">
              <button className="view-btn" onClick={() => navigate(`/product/${product.id}`)}>View Details</button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length > itemsPerPage && (
        <div className="pagination">
          <button 
            className="pagination-btn" 
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                className={`page-number ${currentPage === number ? 'active' : ''}`}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            ))}
          </div>

          <button 
            className="pagination-btn" 
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

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
