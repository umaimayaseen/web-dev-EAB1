import React, { useState } from 'react';
import { myDatabase } from '../supabaseClient';

function AdminProductForm({ user, onProductAdded }) {
  // Login / Signup State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  // Add Product Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // 1. Auth Function (Sign In / Sign Up)
  async function handleAuth(e) {
    e.preventDefault();

    if (isSignUp) {
      const { error } = await myDatabase.auth.signUp({ email, password });
      if (error) alert("Error: " + error.message);
      else {
        alert("Account registered! You can now login.");
        setIsSignUp(false);
      }
    } else {
      const { error } = await myDatabase.auth.signInWithPassword({ email, password });
      if (error) alert("Login Error: " + error.message);
    }
  }

  // 2. Add Product Function (Insert into Supabase)
  async function handleAddProduct(e) {
    e.preventDefault();

    const { error } = await myDatabase
      .from('products')
      .insert([
        {
          title: title,
          price: Number(price),
          description: description,
          image_url: imageUrl,
          user_id: user.id,
          user_email: user.email
        }
      ]);

    if (error) {
      alert("Failed: " + error.message);
    } else {
      alert("🎉 Product added successfully!");
      setTitle('');
      setPrice('');
      setDescription('');
      setImageUrl('');
      onProductAdded();
    }
  }

  // If user is not logged in, show Auth Box
  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>🔐 {isSignUp ? 'Admin Sign Up' : 'Admin Login'}</h2>
          <p className="auth-subtitle">Login to add products to the store.</p>

          <form onSubmit={handleAuth} className="form-layout">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="styled-input"
              required
            />
            <input
              type="password"
              placeholder="Password (minimum 6 letters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="styled-input"
              required
            />
            <button type="submit" className="primary-btn">
              {isSignUp ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <button 
            onClick={() => setIsSignUp(!isSignUp)} 
            className="toggle-auth-btn"
          >
            {isSignUp ? 'Already have an account? Login' : "Need an account? Sign Up"}
          </button>
        </div>
      </div>
    );
  }

  // If logged in, show Add Product Form
  return (
    <div className="admin-form-container">
      <div className="admin-form-card">
        <div className="form-header">
          <h2>➕ Add New Product</h2>
          <p>Logged in as: <strong>{user.email}</strong></p>
        </div>

        <form onSubmit={handleAddProduct} className="form-layout">
          <div className="input-group">
            <label>Product Title *</label>
            <input
              type="text"
              placeholder="e.g. Wireless Mouse"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="styled-input"
              required
            />
          </div>

          <div className="input-group">
            <label>Price ($) *</label>
            <input
              type="number"
              placeholder="e.g. 29.99"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="styled-input"
              required
            />
          </div>

          <div className="input-group">
            <label>Image URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="styled-input"
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              rows="3"
              placeholder="Product details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="styled-input"
            />
          </div>

          <button type="submit" className="primary-btn">
            Publish Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminProductForm;