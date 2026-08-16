import React from 'react';

function Home({ products, onAddToCart, onGoToAdmin }) {
  return (
    <div className="home-container">
      <section className="hero-banner">
        <div className="hero-text">
          <span className="hero-tag">Live Store</span>
          <h1>Welcome to MartManager</h1>
          <p>Real-time products loaded straight from Supabase Database.</p>
        </div>
      </section>

      <section className="products-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Store Products</h2>
            <p className="section-subtitle">Browse items added by Admin</p>
          </div>
          <button onClick={onGoToAdmin} className="secondary-action-btn">
            + Add New Product
          </button>
        </div>

        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No products found!</h3>
            <p>Login as Admin and add your first product.</p>
            <button onClick={onGoToAdmin} className="primary-btn">
              Go to Admin Panel
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img 
                  src={product.image_url } 
                  alt={product.title} 
                  className="product-img" 
                />
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p>{product.description || 'No description available.'}</p>
                  <div className="product-bottom">
                    <span className="price-tag">${product.price}</span>
                    <button 
                      onClick={() => onAddToCart(product)} 
                      className="add-to-cart-btn"
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;