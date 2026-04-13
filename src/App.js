import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/Footer';

import './App.css';
import Checkout from './pages/Checkout';
function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });



  // Add to cart, increase quantity if element already exists
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Update quantity function for Cart page
  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + change;
          return { ...item, quantity: newQty > 0 ? newQty : 1 }; // Prevent 0 or negative
        }
        return item;
      })
    );
  };

  // Remove element function for Cart page
  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate total items for Navbar badge (sum of all quantities)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <div>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={<h1 style={{ textAlign: 'center', marginTop: '40px' }}>Home Page</h1>}
        />

        <Route
          path="/shop"
          element={<Shop handleAddToCart={handleAddToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              handleRemove={handleRemove}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetails handleAddToCart={handleAddToCart} />}
        />
      </Routes>

      <Footer name="Made by Omar 💪" />
    </div>
  );
}

export default App;