import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { myOrdersApi } from "../../api/orderApi";
import toast from "../../utils/toast";

export const getMyOrders = createAsyncThunk(
  "orders/myOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await myOrdersApi();
      return res.data;
    } catch (err) {
      toast.error("Failed to load orders");
      return rejectWithValue(err.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: { myOrders: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;
