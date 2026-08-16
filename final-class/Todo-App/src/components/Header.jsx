import React from 'react';

function Header({ page, setPage, user, onLogout, cartCount }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <h2 className="brand-logo" onClick={() => setPage('home')}>
          🛍️ MartManager
        </h2>

        <nav className="nav-links">
          <button 
            className={`nav-btn ${page === 'home' ? 'active' : ''}`} 
            onClick={() => setPage('home')}
          >
            Home
          </button>
          
          <button 
            className={`nav-btn ${page === 'admin' ? 'active' : ''}`} 
            onClick={() => setPage('admin')}
          >
            {user ? '➕ Add Product' : '🔐 Admin'}
          </button>

          <button 
            className={`nav-btn ${page === 'cart' ? 'active' : ''}`} 
            onClick={() => setPage('cart')}
          >
            🛒 Cart ({cartCount})
          </button>
        </nav>

        <div>
          {user ? (
            <div className="user-profile">
              <span className="user-email">{user.email}</span>
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <button onClick={() => setPage('admin')} className="admin-login-btn">
              Login as Admin
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;