'use client';
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import removeFromCart from "./slice/cartSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // rcart: removeFromCart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
