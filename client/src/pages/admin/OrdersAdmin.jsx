import React, { useEffect, useState } from "react";
import { allOrders, updateOrderStatus } from "../../api/orderApi";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    allOrders().then((res) => setOrders(res));
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o))
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>

      {Array.isArray(orders) && orders.length > 0 ? (
        <ul>
          {orders.map((o) => (
            <li key={o._id} className="border p-3 mb-2 rounded">
              Order #{o._id} - {o.status}
              <div className="mt-2">
                <button
                  onClick={() => handleUpdateStatus(o._id, "Shipped")}
                  className="mr-2 bg-yellow-500 px-2 py-1 rounded"
                >
                  Mark Shipped
                </button>
                <button
                  onClick={() => handleUpdateStatus(o._id, "Delivered")}
                  className="bg-green-600 px-2 py-1 rounded text-white"
                >
                  Mark Delivered
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersAdmin;
