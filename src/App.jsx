import React, { useState, useEffect } from 'react';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { fetchProducts, placeOrder } from './api';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        showToast('Failed to load products. Is the backend running?');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart`);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      setCartItems(prev => prev.filter(item => item.id !== id));
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      const total_amount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const orderData = {
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total_amount
      };
      
      await placeOrder(orderData);
      setCartItems([]);
      setIsCartOpen(false);
      showToast('Order placed successfully! 🎉');
    } catch (error) {
      showToast('Checkout failed. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="navbar">
        <div className="container nav-content">
          <a href="/" className="logo flex-between" style={{gap: '0.5rem'}}>
            <ShoppingBag color="#818cf8" />
            Lumina
          </a>
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={20} />
            Cart
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </button>
        </div>
      </nav>

      <main className="main-content container">
        <section className="hero-section">
          <h1 className="hero-title">Discover the Extraordinary</h1>
          <p className="hero-subtitle">
            Curated premium products designed to elevate your everyday lifestyle. 
            Experience quality like never before.
          </p>
        </section>

        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        )}
      </main>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
        isCheckingOut={isCheckingOut}
      />

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}
    </>
  );
}

export default App;
