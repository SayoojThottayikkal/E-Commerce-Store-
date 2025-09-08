import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../store/slices/productSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  if (!selected) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-8 flex gap-8">
      <img
        src={`http://localhost:5000${selected.image}`}
        alt={selected.title}
        className="w-1/3 rounded shadow"
      />
      <div>
        <h2 className="text-2xl font-bold">{selected.title}</h2>
        <p className="text-gray-600 mt-2">{selected.description}</p>
        <p className="text-xl font-semibold mt-4">₹{selected.price}</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
