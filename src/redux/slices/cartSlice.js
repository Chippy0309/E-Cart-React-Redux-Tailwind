import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],

  reducers: {
    // ✅ Add to Cart (increase qty if already present)
    addToCart: (state, action) => {
      const itemInCart = state.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    // ✅ Remove completely
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },

    // ✅ Increase qty
    incrementQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },

    // ✅ Decrease qty (remove if qty = 1)
    decrementQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          return state.filter((i) => i.id !== action.payload.id);
        }
      }
    },

    // ✅ Clear all
    clearCart: () => {
      return [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
