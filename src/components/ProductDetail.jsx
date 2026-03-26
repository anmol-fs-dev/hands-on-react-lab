import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Intentional delay to show skeletons
        await new Promise(resolve => setTimeout(resolve, 1500));
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="product-detail-page">
        <button className="back-btn"><span className="arrow">←</span> Back to Collection</button>
        <div className="skeleton-detail">
          <div className="skeleton-detail-image skeleton"></div>
          <div className="skeleton-detail-info">
            <div className="skeleton-title skeleton"></div>
            <div className="skeleton-text skeleton" style={{ width: '40%' }}></div>
            <div className="skeleton-price skeleton"></div>
            <div className="skeleton-text skeleton"></div>
            <div className="skeleton-text skeleton"></div>
            <div className="skeleton-text skeleton" style={{ width: '80%' }}></div>
            <div className="add-to-cart-btn-large skeleton"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong.</h2>
        <p>{error || "Product not found"}</p>
        <button onClick={() => navigate(-1)} className="retry-btn">Go Back</button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back to Products
      </button>
      
      <div className="detail-card">
        <div className="detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="detail-info">
          <h1 className="detail-title">{product.title}</h1>
          <p className="detail-category">{product.category}</p>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <div className="detail-rating">
            <span className="star">★</span> {product.rating?.rate} ({product.rating?.count} reviews)
          </div>
          <p className="detail-description">{product.description}</p>
          <button 
            className="add-to-cart-btn-large"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
