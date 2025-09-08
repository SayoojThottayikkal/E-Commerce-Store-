import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { addToWishlist } from "../store/slices/wishlistSlice";
import { Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
  };

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition relative">
      <button
        onClick={handleAddToWishlist}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:text-red-500 transition"
      >
        <Heart size={20} />
      </button>

      <Link to={`/products/${product._id}`}>
        <img
          src={
            product.image
              ? `http://localhost:5000${product.image}`
              : "/placeholder.png"
          }
          alt={product.title}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
      </Link>

      <p className="text-gray-600">₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-3 py-1 rounded mt-2 w-full hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
