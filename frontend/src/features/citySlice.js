import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const fetchCities = createAsyncThunk(
  "city/fetchCities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cities");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching cities"
      );
    }
  }
);

export const fetchCityById = createAsyncThunk(
  "city/fetchCityById",
  async (cityName, { rejectWithValue }) => {
    try {
      const response = await api.get(`/weather/${cityName}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching city details"
      );
    }
  }
);

export const fetchCityForecast = createAsyncThunk(
  "city/fetchCityForecast",
  async (cityName, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cities/${cityName}/forecast`);
      return response.data.forecast;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching forecast"
      );
    }
  }
);

export const addCity = createAsyncThunk(
  "city/addCity",
  async (cityName, { rejectWithValue }) => {
    try {
      const response = await api.post("/cities", { city: cityName });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding city"
      );
    }
  }
);

export const removeCity = createAsyncThunk(
  "city/removeCity",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/cities/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error removing city"
      );
    }
  }
);

const citySlice = createSlice({
  name: "city",
  initialState: {
    cities: [],
    city: null,
    forecast: [],
    isLoading: false,
    isError: false,
    message: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCities
      .addCase(fetchCities.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // fetchCityById
      .addCase(fetchCityById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = null;
      })
      .addCase(fetchCityById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.city = action.payload;
      })
      .addCase(fetchCityById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // fetchCityForecast
      .addCase(fetchCityForecast.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = null;
      })
      .addCase(fetchCityForecast.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forecast = action.payload;
      })
      .addCase(fetchCityForecast.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // addCity
      .addCase(addCity.fulfilled, (state, action) => {
        state.cities.push(action.payload);
      })
      .addCase(addCity.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      // removeCity
      .addCase(removeCity.fulfilled, (state, action) => {
        state.cities = state.cities.filter(
          (city) => city._id !== action.payload
        );
      })
      .addCase(removeCity.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearMessage } = citySlice.actions;
export default citySlice.reducer;
