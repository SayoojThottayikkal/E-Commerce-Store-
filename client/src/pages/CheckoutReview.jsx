import React from "react";
import { useNavigate } from "react-router-dom";

const CheckoutReview = () => {
  const navigate = useNavigate();
  const address = localStorage.getItem("checkoutAddress");

  const handlePlaceOrder = () => {
    navigate("/order/success");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Review Order</h2>
      <p>
        <strong>Shipping Address:</strong> {address}
      </p>
      <button
        onClick={handlePlaceOrder}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutReview;
