
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  cartItems: { id: number; title: string; price: number }[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
        // Filter out the product by its ID
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      },
  },
});

export const { addToCart ,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
