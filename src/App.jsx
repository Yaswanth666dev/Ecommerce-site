// import React, { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";

// import "./App.css";
// import Navbar from "./stores/components/Navbar";

// import Shirts from "./stores/components/Shirts";
// import CartPage from "./stores/components/CartPage";
// import PaymentPage from "./stores/components/paymentPage";
// import LandingPage from "./stores/components/Landingpage";

// const App = () => {
//   const [cart, setCart] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res1 = await fetch("https://fakestoreapi.com/products");
//         const res2 = await fetch("https://dummyjson.com/products");
//         const data1 = await res1.json();
//         const data2 = await res2.json();

//         const normalizedDummyProducts = data2.products.map((product) => ({
//           ...product,
//           image: product.images?.[0] || "https://via.placeholder.com/100",
//         }));

//         const combined = [...data1, ...normalizedDummyProducts];
//         setAllProducts(combined);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const addToCart = (item) => {
//     setCart((prevCart) => {
//       const existing = prevCart.find((cartItem) => cartItem.id === item.id);
//       if (existing) {
//         return prevCart.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       } else {
//         return [...prevCart, { ...item, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id, newQty) => {
//     setCart((prevCart) => {
//       if (newQty <= 0) {
//         return prevCart.filter((item) => item.id !== id);
//       }
//       return prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: newQty } : item
//       );
//     });
//   };

//   const calculateTotal = () => {
//     return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   };

//   return (
//     <div className="app-container">
//       {/* ✅ Navbar contains search input and cart count */}
//       <Navbar cart={cart} />

//       <main className="main-content">
//         <Routes>
//           <Route path="/" element={<LandingPage addToCart={addToCart} />} />
//           <Route path="/shirts" element={<Shirts addToCart={addToCart} />} />
//           <Route
//             path="/cart"
//             element={
//               <CartPage
//                 cart={cart}
//                 removeFromCart={removeFromCart}
//                 updateQuantity={updateQuantity}
//                 allProducts={allProducts}
//                 addToCart={addToCart}
//               />
//             }
//           />
//           <Route
//             path="/payment"
//             element={<PaymentPage cart={cart} total={calculateTotal()} />}
//           />
//         </Routes>
//       </main>
//     </div>
//   );
// };

// export default App;

// src/App.jsx

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./stores/components/Navbar";
import Shirts from "./stores/components/Shirts";
import CartPage from "./stores/components/CartPage";
import PaymentPage from "./stores/components/PaymentPage";
import LandingPage from "./stores/components/Landingpage";

const App = () => {
  // ✅ Cart with localStorage support
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [allProducts, setAllProducts] = useState([]);

  // ✅ Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res1 = await fetch("https://fakestoreapi.com/products");
        const res2 = await fetch("https://dummyjson.com/products");
        const data1 = await res1.json();
        const data2 = await res2.json();

        const normalizedDummyProducts = data2.products.map((product) => ({
          ...product,
          image: product.images?.[0] || "https://via.placeholder.com/100",
        }));

        const combined = [...data1, ...normalizedDummyProducts];
        setAllProducts(combined);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Add to Cart
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

  // ✅ Remove from Cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // ✅ Update Cart Quantity
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

  // ✅ Calculate total
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="app-container">
      {/* Navbar shows cart count and search */}
      <Navbar cart={cart} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage addToCart={addToCart} />} />
          <Route path="/shirts" element={<Shirts addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                allProducts={allProducts}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/payment"
            element={
              <PaymentPage
                cart={cart}
                setCart={setCart}  // ✅ important for clearing cart
                total={calculateTotal()}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
