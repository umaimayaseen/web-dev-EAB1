import React, { useState, useEffect } from 'react';
import './App.css';
import { myDatabase } from './supabaseClient';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AdminProductForm from './components/AdminProductForm';
import Cart from './components/Cart';

function App() {
  const [page, setPage] = useState('home'); // 'home' | 'admin' | 'cart'
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

// yeh Supabase se foran session utha kar check karta hai ke user pehle se logged in hai ya nahi.
// Aur baad mein jab bhi user Login ya Logout kare, yeh foran setUser ko update kar deta hai.

  useEffect(() => {
  const { data: checkUser } = myDatabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user || null);
  });

  return () => checkUser.subscription.unsubscribe();
}, []);


  // 2. Fetch All Products from Supabase
 

async function getProducts() {
  const { data, error } = await myDatabase
    .from('products')
    .select('*');

  if (!error && data) {
    setProducts(data);
  }
}
  useEffect(() => {
    getProducts();
  }, []);

  // 3. Add to Cart
  function addToCart(product) {
    const found = cart.find((item) => item.id === product.id);

    if (found) {
      // Agar item pehle se cart mein hai toh quantity barha do
      setCart(cart.map((item) => 
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      // Naya item add karo
      setCart([...cart, { ...product, qty: 1 }]);
    }
    alert(product.title + " added to cart!");
  }

  // 4. Update Quantity (+ / -)
  function changeQty(id, amount) {
    setCart(cart.map((item) => {
      if (item.id === id) {
        const newQty = item.qty + amount;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  }

  // 5. Delete Item from Cart
  function deleteCartItem(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  // 6. Logout
  async function logout() {
    await myDatabase.auth.signOut();
    setPage('home');
  }

  // Total items in cart
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="app-layout">
      <Header 
        page={page} 
        setPage={setPage} 
        user={user} 
        onLogout={logout} 
        cartCount={cartCount} 
      />

      <main className="main-content">
        {page === 'home' && (
          <Home 
            products={products} 
            onAddToCart={addToCart} 
            onGoToAdmin={() => setPage('admin')} 
          />
        )}

        {page === 'admin' && (
          <AdminProductForm 
            user={user} 
            onProductAdded={() => {
              getProducts();
              setPage('home');
            }} 
          />
        )}

        {page === 'cart' && (
          <Cart 
            cart={cart} 
            user={user}
            onChangeQty={changeQty} 
            onDelete={deleteCartItem} 
            onClearCart={() => {
              setCart([]);
              setPage('home');
            }} 
            onGoToHome={() => setPage('home')} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;