import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">Welcome to MyShop 🛒</h1>
      <p className="mt-4 text-gray-600">Your one-stop shop for everything!</p>
      <Link
        to="/products"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded"
      >
        Browse Products
      </Link>
    </div>
  );
};

export default Home;
