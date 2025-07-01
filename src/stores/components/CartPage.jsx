import { useNavigate } from "react-router-dom";

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                  style={{ width: "100px", height: "100px", objectFit: "contain" }}
                />

                <div className="cart-item-info">
                  <h4>{item.title}</h4>
                  <p>Price: ₹{item.price}</p>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total" style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
            Total: ₹{total.toFixed(2)}
          </div>

          <button
            className="proceed-btn"
            onClick={() => navigate("/payment")}
            style={{
              marginTop: "1rem",
              padding: "0.7rem 1.5rem",
              backgroundColor: "#60a5fa",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
