// import React from "react";
// import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
// import "../../App.css";

// const PaymentPage = ({ cart = [], total = 0, setCart }) => {
//   const navigate = useNavigate();

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const formik = useFormik({
//     initialValues: {
//       fullName: "",
//       email: "",
//       phone: "",
//       address: "",
//       city: "",
//       state: "",
//       pincode: "",
//     },
//     validate: (values) => {
//       const errors = {};
//       if (!values.fullName.trim()) errors.fullName = "Enter full name";
//       if (!values.email) {
//         errors.email = "Enter email";
//       } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(values.email)) {
//         errors.email = "Invalid email";
//       }

//       if (!values.phone) {
//         errors.phone = "Enter phone number";
//       } else if (!/^[6-9]\d{9}$/.test(values.phone)) {
//         errors.phone = "Invalid Indian phone number";
//       }

//       if (!values.address.trim()) errors.address = "Enter address";
//       if (!values.city.trim()) errors.city = "Enter city";
//       if (!values.state.trim()) errors.state = "Enter state";

//       if (!values.pincode) {
//         errors.pincode = "Enter pincode";
//       } else if (!/^\d{6}$/.test(values.pincode)) {
//         errors.pincode = "Invalid pincode";
//       }

//       return errors;
//     },
//     onSubmit: async (values) => {
//       const res = await loadRazorpayScript();
//       if (!res) {
//         alert("Razorpay SDK failed to load.");
//         return;
//       }

//       const fullAddress = `${values.address}, ${values.city}, ${values.state} - ${values.pincode}`;

//       const options = {
//         key: "rzp_test_1DP5mmOlF5G5ag", 
//         amount: total * 100,
//         currency: "INR",
//         name: "E-Mart",
//         description: "Payment for your order",
//         handler: function (response) {
//           localStorage.removeItem("cart");
//           if (setCart) setCart([]);
//           alert(
//             `✅ Payment successful!\nPayment ID: ${response.razorpay_payment_id}`
//           );
//           navigate("/");
//         },
//         prefill: {
//           name: values.fullName,
//           email: values.email,
//           contact: values.phone,
//         },
//         notes: {
//           address: fullAddress,
//         },
//         theme: {
//           color: "#F37254",
//         },
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     },
//   });

//   return (
//     <div className="payment-page">
//       <h2>Checkout</h2>
//       <form className="payment-form" onSubmit={formik.handleSubmit}>
//         <label>
//           Full Name <span className="required">*</span>
//         </label>
//         <input
//           type="text"
//           name="fullName"
//           {...formik.getFieldProps("fullName")}
//         />
//         {formik.touched.fullName && formik.errors.fullName && (
//           <div className="error">{formik.errors.fullName}</div>
//         )}

//         <label>
//           Email <span className="required">*</span>
//         </label>
//         <input type="email" name="email" {...formik.getFieldProps("email")} />
//         {formik.touched.email && formik.errors.email && (
//           <div className="error">{formik.errors.email}</div>
//         )}

//         <label>
//           Phone Number <span className="required">*</span>
//         </label>
//         <input type="tel" name="phone" {...formik.getFieldProps("phone")} />
//         {formik.touched.phone && formik.errors.phone && (
//           <div className="error">{formik.errors.phone}</div>
//         )}

//         <label>
//           Street Address <span className="required">*</span>
//         </label>
//         <textarea
//           name="address"
//           rows="2"
//           {...formik.getFieldProps("address")}
//         />
//         {formik.touched.address && formik.errors.address && (
//           <div className="error">{formik.errors.address}</div>
//         )}

//         <label>
//           City <span className="required">*</span>
//         </label>
//         <input type="text" name="city" {...formik.getFieldProps("city")} />
//         {formik.touched.city && formik.errors.city && (
//           <div className="error">{formik.errors.city}</div>
//         )}

//         <label>
//           State <span className="required">*</span>
//         </label>
//         <input type="text" name="state" {...formik.getFieldProps("state")} />
//         {formik.touched.state && formik.errors.state && (
//           <div className="error">{formik.errors.state}</div>
//         )}

//         <label>
//           Pincode <span className="required">*</span>
//         </label>
//         <input
//           type="text"
//           name="pincode"
//           {...formik.getFieldProps("pincode")}
//         />
//         {formik.touched.pincode && formik.errors.pincode && (
//           <div className="error">{formik.errors.pincode}</div>
//         )}

//         <div className="payment-summary">
//           <h3>Total Amount: ₹{total.toFixed(2)}</h3>
//         </div>

//         <button type="submit">Pay Now</button>
//       </form>
//     </div>
//   );
// };

// export default PaymentPage;





import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "../../App.css"; 

const PaymentPage = ({ cart = [], total = 0, setCart }) => {
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.fullName.trim()) errors.fullName = "Enter full name";
      if (!values.email) {
        errors.email = "Enter email";
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email";
      }
      if (!values.phone) {
        errors.phone = "Enter phone number";
      } else if (!/^[6-9]\d{9}$/.test(values.phone)) {
        errors.phone = "Invalid phone";
      }
      if (!values.address.trim()) errors.address = "Enter address";
      if (!values.city.trim()) errors.city = "Enter city";
      if (!values.state.trim()) errors.state = "Enter state";
      if (!values.pincode) {
        errors.pincode = "Enter pincode";
      } else if (!/^\d{6}$/.test(values.pincode)) {
        errors.pincode = "Invalid pincode";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const res = await loadRazorpayScript();
        if (!res) {
          alert("Razorpay SDK failed to load.");
          return;
        }

        const fullAddress = `${values.address}, ${values.city}, ${values.state} - ${values.pincode}`;

        const options = {
          key: "rzp_test_1DP5mmOlF5G5ag",
          amount: total * 100,
          currency: "INR",
          name: "E-Mart",
          description: "Payment for your order",
          handler: function (response) {
            // ✅ clear cart after successful payment
            localStorage.removeItem("cart");
            if (setCart) setCart([]);
            alert(`✅ Payment successful!\nPayment ID: ${response.razorpay_payment_id}`);
            navigate("/");
          },
          prefill: {
            name: values.fullName,
            email: values.email,
            contact: values.phone,
          },
          notes: {
            address: fullAddress,
          },
          theme: {
            color: "#F37254",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error("Payment Error:", error);
        alert("Something went wrong. Try again.");
      }
    },
  });

  return (
    <div className="payment-page">
      <h2 className="checkout-heading">⭐ Checkout</h2>

      <form className="payment-form" onSubmit={formik.handleSubmit}>
        <label>
          Full Name <span className="required">*</span>
        </label>
        <input type="text" name="fullName" {...formik.getFieldProps("fullName")} />
        {formik.touched.fullName && formik.errors.fullName && <div className="error">{formik.errors.fullName}</div>}

        <label>
          Email <span className="required">*</span>
        </label>
        <input type="email" name="email" {...formik.getFieldProps("email")} />
        {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}

        <label>
          Phone Number <span className="required">*</span>
        </label>
        <input type="tel" name="phone" {...formik.getFieldProps("phone")} />
        {formik.touched.phone && formik.errors.phone && <div className="error">{formik.errors.phone}</div>}

        <label>
          Address <span className="required">*</span>
        </label>
        <textarea name="address" rows="2" {...formik.getFieldProps("address")} />
        {formik.touched.address && formik.errors.address && <div className="error">{formik.errors.address}</div>}

        <label>
          City <span className="required">*</span>
        </label>
        <input type="text" name="city" {...formik.getFieldProps("city")} />
        {formik.touched.city && formik.errors.city && <div className="error">{formik.errors.city}</div>}

        <label>
          State <span className="required">*</span>
        </label>
        <input type="text" name="state" {...formik.getFieldProps("state")} />
        {formik.touched.state && formik.errors.state && <div className="error">{formik.errors.state}</div>}

        <label>
          Pincode <span className="required">*</span>
        </label>
        <input type="text" name="pincode" {...formik.getFieldProps("pincode")} />
        {formik.touched.pincode && formik.errors.pincode && <div className="error">{formik.errors.pincode}</div>}

        <div className="payment-summary">Total: ₹{total.toFixed(2)}</div>

        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentPage;

