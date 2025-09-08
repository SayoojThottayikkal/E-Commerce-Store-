import { createSlice } from "@reduxjs/toolkit";
import toast from "../../utils/toast";

const initialState = {
  items: JSON.parse(localStorage.getItem("wishlist")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find((i) => i._id === action.payload._id);
      if (!exists) {
        state.items.push(action.payload);
        toast.success("Added to wishlist");
      } else {
        toast.info("Already in wishlist");
      }
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      toast.error("Removed from wishlist");
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
      toast.info("Wishlist cleared");
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
