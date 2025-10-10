import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./authActions";
import type { User } from "server/types/types";

export interface IReduxStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
} as IReduxStore;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});
export default authSlice.reducer;
