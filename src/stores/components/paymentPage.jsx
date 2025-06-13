import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const PaymentPage = ({ cart, total }) => {
  const navigate = useNavigate();

  const handlePayment = () => {
    alert("Payment successful! Thank you for your order.");
    navigate('/'); 
  };

  return (
    <div className="payment-page">
      <h2>Checkout</h2>
      <form className="payment-form">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email Address" required />
        <textarea placeholder="Shipping Address" rows="4" required></textarea>
        <div className="payment-summary">
          <h3>Total: ₹{total.toFixed(2)}</h3>
        </div>
        <button type="button" onClick={handlePayment}>Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentPage;
