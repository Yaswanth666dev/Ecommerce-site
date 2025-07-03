

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ cart }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value.trim();
    navigate(`/shirts?search=${encodeURIComponent(value)}`);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="navSection">
      <div className="title">
        <h2 onClick={() => navigate("/")}>E-Mart</h2>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search items..."
          onChange={handleChange}
        />
      </div>

      <div className="user">
        <div className="cart" onClick={() => navigate('/cart')}>
          Cart ({totalItems})
        </div>
      </div>
    </div>
  );
};

export default Navbar;




