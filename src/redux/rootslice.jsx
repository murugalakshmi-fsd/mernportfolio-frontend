// rootslice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosConfig";

export const fetchPortfolioData = createAsyncThunk(
  'portfolio/fetchPortfolioData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/portfolio'); // Adjust URL as per your backend API
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    loading: false,
    portfolioData: null,
    reloadData: false,
    error: null,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    setPortfolioData: (state, action) => {
      state.portfolioData = action.payload;
      state.error = null; // Clear any previous errors
    },
    setReloadData: (state, action) => {
      state.reloadData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPortfolioData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPortfolioData.fulfilled, (state, action) => {
      state.loading = false;
      state.portfolioData = action.payload;
      state.error = null;
    });
    builder.addCase(fetchPortfolioData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  showLoading,
  hideLoading,
  setPortfolioData,
  setReloadData,
  setError,
} = rootSlice.actions;

export default rootSlice.reducer;
