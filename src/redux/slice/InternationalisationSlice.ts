import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initState = {
  lang: "en",
  currency_factor: 1,
};

export const InternationalisationSlice = createSlice({
  name: "convertor",
  initialState: initState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
    },
    currencyFactor:(state, action) => {
      state.currency_factor = action.payload;
    }
  },
});

export const setLang = (state: RootState) => state.convertor.lang;
export const setcurrFactor = (state: RootState) => state.convertor.currency_factor;

export const { changeLang,currencyFactor } = InternationalisationSlice.actions;

export default InternationalisationSlice.reducer;
