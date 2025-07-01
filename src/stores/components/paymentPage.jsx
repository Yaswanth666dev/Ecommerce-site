

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const PaymentPage = ({ cart = [], total = 0, setCart }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Check your internet.');
      return;
    }

    const { fullName, email, phone, address, city, state, pincode } = formData;

    if (!fullName || !email || !phone || !address || !city || !state || !pincode) {
      alert('Please fill in all required fields.');
      return;
    }

    const fullAddress = `${address}, ${city}, ${state} - ${pincode}`;

    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag', 
      amount: total * 100,
      currency: 'INR',
      name: 'E-Mart',
      description: 'Payment for your order',
      handler: function (response) {
        localStorage.removeItem('cart');
        if (setCart) setCart([]);
        alert(`✅ Payment successful!\nPayment ID: ${response.razorpay_payment_id}`);
        navigate('/');
      },
      prefill: {
        name: fullName,
        email: email,
        contact: phone,
      },
      notes: {
        address: fullAddress,
      },
      theme: {
        color: '#F37254',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="payment-page">
      <h2>Checkout</h2>
      <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Street Address"
          rows="2"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />

        <div className="payment-summary">
          <h3>Total Amount: ₹{total.toFixed(2)}</h3>
        </div>

        <button type="button" onClick={handlePayment}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
