import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-img-wrapper">
        <img src={product.image_url} alt={product.name} className="product-img" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${parseFloat(product.price).toFixed(2)}</span>
          <button 
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
