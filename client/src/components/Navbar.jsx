import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { Heart, ShoppingBasket, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart.items.length);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link
        to={user?.role === "admin" ? "/admin/dashboard" : "/"}
        className="text-2xl font-bold text-blue-600"
      >
        {user?.role === "admin" ? "MyShop Admin" : "MyShop"}
      </Link>

      <div className="flex space-x-6 items-center">
        {user ? (
          user.role === "admin" ? (
            <>
              <Link to="/admin/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/admin/products" className="hover:text-blue-600">
                Products
              </Link>
              <Link to="/admin/orders" className="hover:text-blue-600">
                Orders
              </Link>
              <Link to="/admin/inventory" className="hover:text-blue-600">
                Inventory
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/products" className="hover:text-blue-600">
                <ShoppingBasket />
              </Link>
              <Link to="/wishlist" className="relative hover:text-blue-600">
                <Heart />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative hover:text-blue-600">
                <ShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )
        ) : (
          <Link to="/auth" className="bg-blue-600 text-white px-3 py-1 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
