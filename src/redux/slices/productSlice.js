import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 🔹 Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts', // keep slice key consistent with store
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get("https://dummyjson.com/products");
      // store in sessionStorage for caching
      sessionStorage.setItem("allProducts", JSON.stringify(result.data.products));
      return result.data.products;
    } catch (error) {
      return rejectWithValue("API call failed");
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    allProducts: [],
    loading: false,
    errorMsg: "",
  },
  reducers: {
    // optional: load cached products from sessionStorage
    loadFromCache: (state) => {
      const cached = sessionStorage.getItem("allProducts");
      if (cached) {
        state.allProducts = JSON.parse(cached);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.allProducts = [];
        state.loading = true;
        state.errorMsg = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.loading = false;
        state.errorMsg = "";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.allProducts = [];
        state.loading = false;
        state.errorMsg = action.payload || "API call failed";
      });
  }
});

// ✅ Export actions
export const { loadFromCache } = productSlice.actions;

// ✅ Export reducer
export default productSlice.reducer;
