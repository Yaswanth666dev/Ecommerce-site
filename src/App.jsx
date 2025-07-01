
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./stores/components/Navbar";
import LandingPage from "./stores/components/Landingpage";
import Shirts from "./stores/components/Shirts";
import CartPage from "./stores/components/CartPage";
import PaymentPage from "./stores/components/paymentPage";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQty) => {
    setCart((prevCart) => {
      if (newQty <= 0) {
        return prevCart.filter((item) => item.id !== id);
      }
      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      );
    });
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="app-container">
      <Navbar onSearch={setSearchTerm} cart={cart} />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                searchTerm={searchTerm}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Shirts
                searchTerm={searchTerm}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            }
          />
          <Route
            path="/payment"
            element={<PaymentPage cart={cart} total={calculateTotal()} />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
