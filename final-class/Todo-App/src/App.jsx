import React, { useState, useEffect } from 'react';
import './App.css';
import { myDatabase } from './supabase';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Auth from './components/Auth';
import Products, { PRODUCT_CATALOG } from './components/Products'; // 👈 Data Products.jsx se aa raha hai

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // 1. Session tracking
  useEffect(() => {
    myDatabase.auth.getSession().then(({ data }) => {
      setCurrentUser(data.session?.user || null);
    });

    const { data: authListener } = myDatabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  // 2. Fetch User's Private Cart
  async function loadCart(userId) {
    if (!userId) return;

    const { data, error } = await myDatabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId);

    if (!error && data) {
      setCartItems(data);
    }
  }

  useEffect(() => {
    if (currentUser) {
      loadCart(currentUser.id);
    } else {
      setCartItems([]);
    }
  }, [currentUser]);

  // 3. Add to Cart with Auth Check
  async function handleAddToCart(product) {
    if (!currentUser) {
      alert("🔒 Please log in first to add items to your cart!");
      setCurrentTab('auth');
      return;
    }

    const { error } = await myDatabase
      .from('cart_items')
      .insert([
        {
          product_name: product.name,
          price: product.price,
          image_url: product.image,
          user_id: currentUser.id
        }
      ]);

    if (error) {
      alert("Error adding item: " + error.message);
    } else {
      alert(`Added ${product.name} to your cart!`);
      loadCart(currentUser.id);
    }
  }

  // 4. Remove Item from Cart
  async function handleRemoveFromCart(itemId) {
    const { error } = await myDatabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      alert("Error removing item: " + error.message);
    } else {
      loadCart(currentUser.id);
    }
  }

  // 5. Logout
  async function handleLogout() {
    await myDatabase.auth.signOut();
    setCurrentTab('home');
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  // Home preview ke liye sirf pehle 3 items
  const homePreviewProducts = PRODUCT_CATALOG.slice(0, 3);

  return (
    <div className="app-layout">
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        user={currentUser} 
        onLogout={handleLogout}
        cartCount={cartItems.length}
      />

      <main className="main-content">
        {/* VIEW 1: ABOUT */}
        {currentTab === 'about' && <About />}

        {/* VIEW 2: DEDICATED PRODUCTS PAGE */}
        {currentTab === 'products' && (
          <Products onAddToCart={handleAddToCart} />
        )}

        {/* VIEW 3: AUTH */}
        {currentTab === 'auth' && (
          <Auth onAuthSuccess={() => setCurrentTab('home')} />
        )}

        {/* VIEW 4: CART */}
        {currentTab === 'cart' && (
          <div className="cart-page">
            <h2>Your Shopping Cart 🛒</h2>
            
            {!currentUser ? (
              <div className="empty-state">
                <p>Please log in to view your saved items.</p>
                <button onClick={() => setCurrentTab('auth')} className="primary-btn">
                  Log In Now
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="empty-state">
                <p>Your cart is empty.</p>
                <button onClick={() => setCurrentTab('products')} className="primary-btn">
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="cart-grid">
                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-row">
                      <img src={item.image_url} alt={item.product_name} className="cart-thumb" />
                      <div className="cart-row-details">
                        <h4>{item.product_name}</h4>
                        <span className="cart-price">${item.price}</span>
                      </div>
                      <button 
                        onClick={() => handleRemoveFromCart(item.id)} 
                        className="delete-btn"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="order-summary-card">
                  <h3>Order Summary</h3>
                  <div className="summary-line">
                    <span>Subtotal:</span>
                    <span>${cartTotal}</span>
                  </div>
                  <div className="summary-line">
                    <span>Shipping:</span>
                    <span className="free-badge">FREE</span>
                  </div>
                  <hr />
                  <div className="summary-line total-line">
                    <strong>Total:</strong>
                    <strong>${cartTotal}</strong>
                  </div>
                  <button onClick={() => alert("Order placed successfully!")} className="primary-btn checkout-btn">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 5: HOME PAGE */}
        {currentTab === 'home' && (
          <>
            <section className="hero-banner">
              <div className="hero-text">
                <span className="hero-tag">New Collection 2026</span>
                <h1>Elevate Your Workspace Experience</h1>
                <p>Precision-engineered hardware and audio accessories designed for modern creators.</p>
                <button onClick={() => setCurrentTab('products')} className="primary-btn hero-cta">
                  Shop All Products →
                </button>
              </div>
            </section>

            {/* 3 Featured Products Preview */}
            <section className="products-container">
              <div className="section-header-row">
                <div>
                  <h2 className="section-title">Featured Highlights</h2>
                  <p className="section-subtitle">Top curated essentials for your desk setup.</p>
                </div>
                <button onClick={() => setCurrentTab('products')} className="view-all-link-btn">
                  View All Products →
                </button>
              </div>

              <div className="products-grid">
                {homePreviewProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} className="product-img" />
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <div className="product-bottom">
                        <span className="price-tag">${product.price}</span>
                        <button 
                          onClick={() => handleAddToCart(product)} 
                          className="add-to-cart-btn"
                        >
                          + Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="view-all-center-container">
                <button onClick={() => setCurrentTab('products')} className="primary-btn view-all-large-btn">
                  Browse All Products →
                </button>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;