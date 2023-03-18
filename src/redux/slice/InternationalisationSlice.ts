import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import enMessages from "../../util/translation/en.json";
import frMessages from "../../util/translation/fr.json";

interface InitState {
  lang: string;
  messages: {
    [key: string]: any;
  };
  currency_factor: number[];
  selected_currency: string;
  selected_factor: number;
}

const initState: InitState = {
  lang: navigator.language,
  messages:{
    en: enMessages,
    fr: frMessages,
  },
  currency_factor: [],
  selected_currency: "",
  selected_factor: 1,
};

export const getCurrencyData = createAsyncThunk(
  "currency/getData",
  async () => {
    const response = await axios
      .get(process.env.REACT_APP_CURRENCY_CONVERTOR_API!)
      .then((response) => response.data)
      .catch((error) => console.error(error.message));
    return response.rates;
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
export const translations = (state: RootState) => state.convertor.messages;
export const selectedFactor = (state: RootState) => state.convertor.selected_factor;
export const setSelectedFactor = (state: RootState) =>
  state.convertor.selected_factor;


export const { changeLang, currencyFactor, selectedCurrency} =
  InternationalisationSlice.actions;

export default InternationalisationSlice.reducer;
