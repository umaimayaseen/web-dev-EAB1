import React from 'react';

function About() {
  return (
    <section className="about-section">
      <div className="about-card">
        <h2>About ModernShop 🚀</h2>
        <p className="about-lead">
          We build reliable, lightning-fast digital storefronts with modern cloud architecture.
        </p>
        
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <h3>Instant Delivery</h3>
            <p>Direct digital access to all your purchases without delay.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <h3>Supabase Auth & RLS</h3>
            <p>Every customer's cart and data remains completely isolated and secure.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💎</div>
            <h3>Premium Curation</h3>
            <p>All items in our catalog pass strict performance and quality checks.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;