import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const process = import.meta.env.VITE_API_KEY;
export const weatherAsyncThunk = createAsyncThunk(
  "weatherAsyncThunk",
  async (city) => {
    let res = axios(
      `https://api.openweathermap.org/data/2.5/forecast?q=${
        city || "istanbul"
      }&units=metric&lang=tr&appid=${process}&cnt=5`
    ).then((data) => data.data);
    return res;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    item: [],
    isLoading: false,
    city: "",
    df: [],
    firstItem: [],
  },
  reducers: {
    updateCity: (state, action) => {
      state.city = action.payload;
    },
  },
  extraReducers: {
    [weatherAsyncThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [weatherAsyncThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.item = action.payload.city;
      state.df = action.payload.list.map((item) => {
        return {
          dt: item.dt,
          temp: item.main.temp,
          min: item.main.temp_min,
          max: item.main.temp_max,
          weather: item.weather[0].description,
          icon: item.weather[0].icon,
        };
      });
      state.firstItem = state.df[0];
    },
  },
});

export const { updateCity } = weatherSlice.actions;

export default weatherSlice.reducer;
