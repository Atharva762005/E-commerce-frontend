import React from 'react';
import { X, Minus, Plus } from 'lucide-react';

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onCheckout, isCheckingOut }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image_url} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4 className="cart-item-title">{item.name}</h4>
                    <span className="cart-item-price">${parseFloat(item.price).toFixed(2)}</span>
                    <div className="cart-item-controls">
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button 
                className="checkout-btn"
                onClick={onCheckout}
                disabled={isCheckingOut || items.length === 0}
              >
                {isCheckingOut ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
