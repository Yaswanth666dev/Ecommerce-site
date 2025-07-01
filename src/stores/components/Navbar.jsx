import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onSearch, cart }) => {
  const handleChange = (e) => onSearch(e.target.value);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  return (
    <div className="navSection">
      <div className="title">
        <h2    onClick={() => navigate("/")}>E-Mart</h2>
      </div>

      <div className="search">
        <input type="text" placeholder="Search items..." onChange={handleChange} />
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
