import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">Order Placed ✅</h1>
      <p className="mt-4">Thank you for shopping with us!</p>
      <Link
        to="/orders"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded"
      >
        View My Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
