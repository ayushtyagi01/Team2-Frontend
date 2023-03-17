import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const initState = {
  lang: "en",
  currency_factor: [],
  selected_currency: "",
  selected_factor: 1,
};

export const getCurrencyData = createAsyncThunk(
  "currency/getData",
  async () => {
    const response = await axios.get(
      process.env.REACT_APP_CURRENCY_CONVERTOR_API!.replace(";", "")
    );
    return response.data.rates;
  }
);

export const InternationalisationSlice = createSlice({
  name: "convertor",
  initialState: initState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
    },
    currencyFactor: (state, action) => {
      state.currency_factor = action.payload;
    },
    selectedCurrency: (state, action) => {
      state.selected_currency = action.payload;
      state.selected_factor = state.currency_factor[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrencyData.fulfilled, (state, action) => {
      state.currency_factor = action.payload;
    });
  },
});

export const setLang = (state: RootState) => state.convertor.lang;
export const setSelectedFactor = (state: RootState) =>
  state.convertor.selected_factor;

export const { changeLang, currencyFactor, selectedCurrency } =
  InternationalisationSlice.actions;

export default InternationalisationSlice.reducer;
