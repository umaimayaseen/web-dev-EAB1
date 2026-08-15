import React from 'react';

function Header({ currentTab, setCurrentTab, user, onLogout, cartCount }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-logo" onClick={() => setCurrentTab('home')}>
          🛍️ <span>ModernShop</span>
        </div>

        <nav className="nav-links">
          <button 
            className={`nav-btn ${currentTab === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentTab('home')}
          >
            Home
          </button>
          
          {/* Dedicated Products Tab */}
          <button 
            className={`nav-btn ${currentTab === 'products' ? 'active' : ''}`}
            onClick={() => setCurrentTab('products')}
          >
            Products
          </button>

          <button 
            className={`nav-btn ${currentTab === 'about' ? 'active' : ''}`}
            onClick={() => setCurrentTab('about')}
          >
            About Us
          </button>

          <button 
            className={`nav-btn cart-nav-btn ${currentTab === 'cart' ? 'active' : ''}`}
            onClick={() => setCurrentTab('cart')}
          >
            🛒 Cart ({cartCount})
          </button>
        </nav>

        <div className="header-auth">
          {user ? (
            <div className="user-profile">
              <span className="user-email">{user.email}</span>
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <button onClick={() => setCurrentTab('auth')} className="login-nav-btn">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;