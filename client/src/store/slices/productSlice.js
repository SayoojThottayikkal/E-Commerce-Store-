import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProduct } from "../../api/productApi";
import toast from "../../utils/toast";

export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchProducts();
      return res.data;
    } catch (err) {
      toast.error("Failed to fetch products");
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetchProduct(id);
      return res.data;
    } catch (err) {
      toast.error("Failed to fetch product");
      return rejectWithValue(err.response?.data);
    }
  }
);

const initialState = {
  items: [],
  selected: null,
  loading: false,
  total: 0,
  page: 1,
  pages: 1,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.total = action.payload.total || 0;
        state.page = action.payload.page || 1;
        state.pages = action.payload.pages || 1;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(getProductById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
