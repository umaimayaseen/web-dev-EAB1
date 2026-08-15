import React from 'react';

// 📦 Saara Product Data yahin define hai
export const PRODUCT_CATALOG = [
  {
    id: 1,
    name: 'Wireless Studio Headphones',
    price: 149,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'High-fidelity audio with active noise cancellation.'
  },
  {
    id: 2,
    name: 'Minimalist Mechanical Keyboard',
    price: 89,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    description: 'Tactile switches with seamless bluetooth connectivity.'
  },
  {
    id: 3,
    name: 'Ergonomic Desk Mouse',
    price: 59,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    description: 'Engineered for wrist support and productive workflows.'
  },
  {
    id: 4,
    name: 'Aluminum Laptop Stand',
    price: 45,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
    description: 'Elevates your screen to optimal ergonomic eye level.'
  },
  {
    id: 5,
    name: 'Ultrawide LED Desk Light Bar',
    price: 65,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    description: 'Glare-free monitor light for night coding sessions.'
  },
  {
    id: 6,
    name: 'Desk Pad & Mouse Mat',
    price: 29,
    image: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=500&q=80',
    description: 'Water-resistant vegan leather surface for smooth tracking.'
  }
];

function Products({ onAddToCart }) {
  return (
    <div className="products-page">
      <div className="products-header">
        <h2>All Products Catalog 📦</h2>
        <p>Explore our complete range of premium workspace hardware.</p>
      </div>

      <div className="products-grid">
        {PRODUCT_CATALOG.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-img" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
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
    </div>
  );
}

export default Products;