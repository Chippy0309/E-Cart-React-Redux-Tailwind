// productSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get("https://dummyjson.com/products");
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
    searchQuery: ""   // ✅ add search query state
  },
  reducers: {
    loadFromCache: (state) => {
      const cached = sessionStorage.getItem("allProducts");
      if (cached) {
        state.allProducts = JSON.parse(cached);
      }
    },
    setSearchQuery: (state, action) => {   // ✅ update search query
      state.searchQuery = action.payload;
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

export const { loadFromCache, setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
