import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../store/slices/orderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { myOrders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {myOrders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {myOrders.map((o) => (
            <li key={o._id} className="border p-3 mb-2 rounded">
              Order #{o._id} - Status: {o.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
