import React from "react";
import "./stlye.css";
const Checkout = () => {
  return (
    <div className="checkout-success">
      <h2>Checkout Successful</h2>
      <p>Your order might take sometime to process</p>
      <p>Check your order status at your profile after about 10 mins.</p>
      <p>
        In case of my inquiries contract the support at{" "}
        <strong>Support@gmail.com</strong>
      </p>
      <a href="/shop" className="btn btn-ghost text-white hover:border-red bg-red hover:bg-white hover:text-black">Shopping more</a>
    </div>
  );
};

export default Checkout;
