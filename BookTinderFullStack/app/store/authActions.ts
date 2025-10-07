import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "server/types/types";

interface registerReturn {
  user: User;
  token: string;
}
export const registerUser = createAsyncThunk<
  registerReturn,
  { name: string; email: string; password: string }
>("auth/register", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  } catch (error: any) {
    return rejectWithValue(error.response.data.errors);
  }
});

export const loginUser = createAsyncThunk<
  registerReturn,
  { email: string; password: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  } catch (error: any) {
    return rejectWithValue(error.response.data.errors);
  }
});
