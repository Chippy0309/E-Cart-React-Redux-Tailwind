import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import wishlistSlice from "./slices/wishlistSlice";
import cartSlice from "./slices/cartSlice";

const cartStore = configureStore({
  reducer: {
    product: productSlice,   // ✅ use meaningful key names
    wishlist: wishlistSlice, // ✅ added wishlist reducer
    cart:cartSlice
},
});

export default cartStore;
