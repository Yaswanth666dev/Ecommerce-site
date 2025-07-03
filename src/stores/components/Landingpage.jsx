


import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Beauty",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    },
    {
      name: "Electronics",
      image:
        "https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "Furniture",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "Groceries",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60",
    },
  ];

  const featuredDeals = [
    {
      title: "Flat 50% Off on Electronics",
      desc: "Grab gadgets at half the price for a limited time!",
    },
    {
      title: "Buy 1 Get 1 Free on Beauty",
      desc: "Double your glam with our BOGO beauty deals!",
    },
    {
      title: "Home Makeover Sale",
      desc: "Upgrade your furniture at unbeatable prices!",
    },
    {
      title: "Grocery Essentials",
      desc: "Daily needs delivered fast & fresh at 30% off!",
    },
  ];

  return (
    <div className="landing-container">
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Shop Smart, Live Better</h1>
          <p>
            Explore top deals and unbeatable fashion only at{" "}
            <span className="highlight">E-Mart</span>.
          </p>
          <button onClick={() => navigate("/shirts")}>Shop Now</button>
        </div>
      </div>

      <div className="features-section">
        <div className="feature">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
            alt="Fast Delivery"
          />
          <h4>Fast Delivery</h4>
          <p>Speedy & safe shipping to your door.</p>
        </div>
        <div className="feature">
          <img
            src="https://cdn-icons-png.flaticon.com/512/891/891419.png"
            alt="Best Deals"
          />
          <h4>Best Prices</h4>
          <p>Unbeatable value on all items.</p>
        </div>
        <div className="feature">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4202/4202843.png"
            alt="Support"
          />
          <h4>24/7 Support</h4>
          <p>We're always here to help you.</p>
        </div>
      </div>

      <div className="categories-section">
        <h2>Top Categories</h2>
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div className="category-card" key={index}>
              <img
                src={cat.image}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x200?text=${cat.name}`;
                }}
                alt={cat.name}
              />
              <p
                onClick={() =>
                  navigate(`/shirts?category=${cat.name.toLowerCase()}`)
                }
                style={{ cursor: "pointer", fontWeight: "bold" }}
              >
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="featured-section">
        <h2>🔥 Featured Deals</h2>
        <div className="featured-text-grid">
          {featuredDeals.map((item, i) => (
            <div className="featured-text-card" key={i}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <button
                className="shop-now-btn"
                onClick={() => navigate("/shirts")}
              >
                Shop Now →
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="why-choose-section">
        <h2>💡 Why Choose E-Mart?</h2>
        <div className="why-grid">
          <div className="why-card">
            <h4>Trusted by Millions</h4>
            <p>Our customers love us for reliability and great pricing.</p>
          </div>
          <div className="why-card">
            <h4>Curated Collections</h4>
            <p>Only the best handpicked products reach you.</p>
          </div>
          <div className="why-card">
            <h4>Easy Returns</h4>
            <p>Hassle-free returns with full support.</p>
          </div>
        </div>
      </div>

      <div className="testimonial-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonial">
          <p>“Best shopping experience ever! Great deals and fast delivery.”</p>
          <span>- Yaswanth, Hyderabad</span>
        </div>
        <div className="testimonial">
          <p>“I love the product range and support service. 5 stars!”</p>
          <span>- Bogesh, Guntur</span>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} E-Mart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
