import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type CredentialType = {
  username: string;
  password: string;
};

export const authLogin = createAsyncThunk(
  "auth/login",
  async (credentials: CredentialType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/login/",
        credentials
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Invalid username or password");
    }
  }
);

type AuthState = {
  token: string | null;
  error: boolean;
  errMsg: unknown | string | null;
};

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  error: false,
  errMsg: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.error = true;
        state.errMsg = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
