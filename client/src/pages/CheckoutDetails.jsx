import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutDetails = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const navigate = useNavigate();

  const handleNext = () => {
    if (!address || !city || !state || !postalCode || !country) {
      alert("Please fill in all shipping fields");
      return;
    }

    const shippingData = { address, city, state, postalCode, country };
    localStorage.setItem("checkoutAddress", JSON.stringify(shippingData));
    localStorage.setItem("checkoutPayment", paymentMethod);

    navigate("/checkout/review");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout Details</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Street Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
        <div className="space-y-3">
          {["COD", "Card", "UPI"].map((method) => (
            <label key={method} className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              {method === "COD"
                ? "Cash on Delivery"
                : method === "Card"
                ? "Credit / Debit Card"
                : "UPI"}
            </label>
          ))}
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
