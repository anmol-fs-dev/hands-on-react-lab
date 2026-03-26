import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="retry-btn">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h1>Your Shopping Cart</h1>
        <p>{cart.length} {cart.length === 1 ? 'item' : 'items'} in your bag</p>
      </header>

      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-category">{item.category}</p>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
              <div className="cart-item-price">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>$0.00</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>$0.00</span>
          </div>
          <button className="checkout-btn">Procced to Checkuot</button>
          <button className="continue-shopping" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
