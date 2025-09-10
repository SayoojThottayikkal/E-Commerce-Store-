import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { myOrdersApi } from "../../api/orderApi";
import toast from "../../utils/toast";

export const getMyOrders = createAsyncThunk(
  "customerOrders/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const data = await myOrdersApi();
      return data;
    } catch (err) {
      toast.error("Failed to load orders");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const customerOrderSlice = createSlice({
  name: "customerOrders",
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

export default customerOrderSlice.reducer;
