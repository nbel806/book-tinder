import { configureStore } from "@reduxjs/toolkit";
import reducer from "./authSlice";

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
