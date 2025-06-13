import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./stores/components/Navbar";
import Shirts from "./stores/components/Shirts";
import CartPage from "./stores/components/CartPage";   // Import as CartPage
import PaymentPage from "./stores/components/paymentPage";

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    setCart(prevCart => {
      const existing = prevCart.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Total price calculation
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar onSearch={setSearchTerm} cart={cart} />

        <Routes>
          <Route
            path="/"
            element={<Shirts searchTerm={searchTerm} addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={<CartPage cart={cart} removeFromCart={removeFromCart} />}
          />
          <Route
            path="/payment"
            element={<PaymentPage cart={cart} total={calculateTotal()} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
