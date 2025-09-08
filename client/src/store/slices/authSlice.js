import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi, meApi } from "../../api/authApi";
import toast from "../../utils/toast";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await loginApi(data);
      localStorage.setItem("token", res.token);

      if (!res.user) {
        await dispatch(loadUser());
      }

      return res;
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Login failed"
      );
      return rejectWithValue(err.response?.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerApi(data);
      return res;
    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed");
      return rejectWithValue(err.response?.data);
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await meApi();
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.user) {
          state.user = action.payload.user;
        }
        state.token = action.payload.token;
        state.isAuthenticated = true;
        toast.success("Login successful");
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        toast.success("Registered successfully");
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })

      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
