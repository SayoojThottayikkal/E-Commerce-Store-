import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromWishlist,
  clearWishlist,
} from "../store/slices/wishlistSlice";
import { addToCart } from "../store/slices/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>

      {items.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p>₹{item.price}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => dispatch(removeFromWishlist(item._id))}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <button
              onClick={() => dispatch(clearWishlist())}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Clear Wishlist
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
