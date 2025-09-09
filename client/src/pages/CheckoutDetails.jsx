import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutDetails = () => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!address) {
      alert("Please enter your address");
      return;
    }
    localStorage.setItem("checkoutAddress", address);
    localStorage.setItem("checkoutPayment", paymentMethod);
    navigate("/checkout/review");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout Details</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
        <textarea
          className="w-full border p-2 rounded"
          rows="4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your delivery address..."
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="Card"
              checked={paymentMethod === "Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit / Debit Card
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI
          </label>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Continue to Review
      </button>
    </div>
  );
};

export default CheckoutDetails;
