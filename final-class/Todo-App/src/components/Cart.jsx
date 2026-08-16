import React from 'react';
import { myDatabase } from '../supabaseClient';

function Cart({ cart, user, onChangeQty, onDelete, onClearCart, onGoToHome }) {
  // Total bill calculation
  const totalAmount = cart.reduce((total, item) => total + (item.price * item.qty), 0);

  // Place order into Supabase `orders` table
  async function handleCheckout() {
    const { error } = await myDatabase
      .from('orders')
      .insert([
        {
          user_email: user ? user.email : 'guest@example.com',
          total_amount: totalAmount,
          items: cart
        }
      ]);

    if (error) {
      alert("Order Failed: " + error.message);
    } else {
      alert(`🎉 Order Placed Successfully! Total: $${totalAmount.toFixed(2)}`);
      onClearCart();
    }
  }

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart 🛒</h2>

      {cart.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <p>Your cart is empty.</p>
          <button onClick={onGoToHome} className="primary-btn">
            Browse Products
          </button>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-row">
                <img 
                  src={item.image_url || 'https://via.placeholder.com/60'} 
                  alt={item.title} 
                  className="cart-thumb" 
                />
                <div className="cart-row-details">
                  <h4>{item.title}</h4>
                  <span className="cart-price">${item.price} each</span>
                </div>

                <div className="qty-controls">
                  <button onClick={() => onChangeQty(item.id, -1)} className="qty-btn">-</button>
                  <span className="qty-number">{item.qty}</span>
                  <button onClick={() => onChangeQty(item.id, 1)} className="qty-btn">+</button>
                </div>

                <span className="item-total">${(item.price * item.qty).toFixed(2)}</span>

                <button onClick={() => onDelete(item.id)} className="delete-btn">
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="order-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Items Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping:</span>
              <span className="free-badge">FREE</span>
            </div>
            <hr />
            <div className="summary-line total-line">
              <strong>Total:</strong>
              <strong>${totalAmount.toFixed(2)}</strong>
            </div>

            <button onClick={handleCheckout} className="primary-btn checkout-btn">
              Place Order 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;