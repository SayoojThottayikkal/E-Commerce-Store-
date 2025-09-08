import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutAddress = () => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    localStorage.setItem("checkoutAddress", address);
    navigate("/checkout/review");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Enter Address</h2>
      <textarea
        className="w-full border p-2 rounded"
        rows="4"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        onClick={handleNext}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Continue
      </button>
    </div>
  );
};

export default CheckoutAddress;
