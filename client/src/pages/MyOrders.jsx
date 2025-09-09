import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../store/slices/orderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { myOrders = [], loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (loading) {
    return <p className="p-6 text-center">Loading orders...</p>;
  }

  if (!myOrders.length) {
    return <p className="p-6 text-center">You have no orders yet.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <ul className="space-y-3">
        {myOrders.map((order) => (
          <li
            key={order._id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`${
                  order.status === "Delivered"
                    ? "text-green-600"
                    : order.status === "Shipped"
                    ? "text-yellow-600"
                    : "text-gray-600"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p>
              <strong>Total:</strong> ₹{order.total}
            </p>
            <div className="mt-2">
              <strong>Items:</strong>
              <ul className="ml-4 list-disc">
                {order.items.map((item) => (
                  <li key={item.product}>
                    {item.title} - {item.qty} x ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
