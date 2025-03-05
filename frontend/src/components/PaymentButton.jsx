import React, { useContext } from "react";
import StripeService from "../services/stripe.service";
import { AuthContext } from "../contexts/AuthContext";
import CartService from "../services/cart.service";

const PaymentButton = ({ cartItem }) => {
  const { user } = useContext(AuthContext);
  const handleCheckout = () => {
    StripeService.createCheckoutSession({
      cart: cartItem,
      email: user.email,
    })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
          //CartService.removeAllItems(user.email);
        }
      })
      .catch((error) => console.log(error.massage));
  };

  return (
    <div>
      {" "}
      <button
        className="btn bg-red text-white"
        onClick={() => handleCheckout()}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default PaymentButton;
