import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
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
                  <div>
                    <label>Qty: </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateQuantity({
                            id: item._id,
                            qty: Number(e.target.value),
                          })
                        )
                      }
                      className="w-16 border rounded px-2"
                    />
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-lg font-bold">Total: ₹{total}</p>
            <div className="space-x-3">
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Clear Cart
              </button>
              <Link
                to="/checkout/address"
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
