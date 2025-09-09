import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { placeOrderApi } from "../api/orderApi";
import toast from "../utils/toast";

const CheckoutReview = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const address = localStorage.getItem("checkoutAddress") || "";
  const payment = localStorage.getItem("checkoutPayment") || "";
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Please login to place order");
      return;
    }

    if (!address) {
      toast.error("Please provide a shipping address");
      return;
    }

    if (!payment) {
      toast.error("Please select a payment method");
      return;
    }

    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!items.length) {
      toast.error("Cart is empty!");
      return;
    }

    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const orderData = {
      items: items.map((i) => ({
        productId: i._id,
        qty: i.quantity,
      })),
      shippingAddress: {
        name: user.name || "Customer",
        address,
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
      total,
      paymentMethod: payment,
    };

    try {
      setLoading(true);
      await placeOrderApi(orderData);

      localStorage.removeItem("cart");
      localStorage.removeItem("checkoutAddress");
      localStorage.removeItem("checkoutPayment");

      toast.success("Order placed successfully!");
      navigate("/order/success");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Review Order</h2>

      <div className="border rounded p-4 mb-4">
        <p className="mb-2">
          <strong>Shipping Address:</strong>
          <br />
          {address || "No address provided"}
        </p>
        <p>
          <strong>Payment Method:</strong> {payment || "Not selected"}
        </p>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default CheckoutReview;
