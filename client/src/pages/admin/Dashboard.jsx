import React, { useEffect, useState } from "react";
import { adminStats } from "../../api/orderApi";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminStats().then((res) => setStats(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-2xl font-bold mt-2">{stats.totalOrders}</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-2xl font-bold mt-2">₹{stats.totalSales}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold mt-2">{stats.totalUsers}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
