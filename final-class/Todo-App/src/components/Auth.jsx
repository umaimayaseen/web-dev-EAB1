import React, { useState } from 'react';
import { myDatabase } from '../supabase';

function Auth({ onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleAuth(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    setLoading(true);

    if (isSignUp) {
      const { error } = await myDatabase.auth.signUp({ email, password });
      if (error) {
        alert("SignUp Failed: " + error.message);
      } else {
        alert("Account created successfully! You can now log in.");
        setIsSignUp(false);
      }
    } else {
      const { error } = await myDatabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert("Login Failed: " + error.message);
      } else {
        if (onAuthSuccess) onAuthSuccess();
      }
    }

    setLoading(false);
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isSignUp ? 'Create Your Account' : 'Welcome Back'}</h2>
        <p className="auth-subtitle">
          {isSignUp ? 'Sign up to start adding items to your cart' : 'Log in to access your personal cart'}
        </p>

        <form onSubmit={handleAuth} className="auth-form">
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="styled-input"
            required
          />

          <input
            type="password"
            placeholder="Password (minimum 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="styled-input"
            required
          />

          <button type="submit" className="primary-btn auth-btn" disabled={loading}>
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
          </button>
        </form>

        <button 
          onClick={() => setIsSignUp(!isSignUp)} 
          className="toggle-auth-btn"
        >
          {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default Auth;