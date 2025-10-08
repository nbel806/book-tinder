import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authActions";
import type { User } from "server/types/types";

export interface IReduxStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
async function getUserFromLocalStorage() {
  const userID = localStorage.getItem("userID");
  if (userID) {
    try {
      const response = await fetch("/api/users/" + userID, {
        method: "GET",
      });
      return response.json();
    } catch (error: any) {
      console.log(error);
      return null;
    }
  } else {
    return null;
  }
}

const initialState = {
  user: await getUserFromLocalStorage(),
  token: localStorage.getItem("token") || null,
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
        state.token = payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;
