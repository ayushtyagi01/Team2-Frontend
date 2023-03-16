import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initState = {
  lang: "en",
  currency: "usd",
};

export const InternationalisationSlice = createSlice({
  name: "convertor",
  initialState: initState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const setLang = (state: RootState) => state.convertor.lang;

export const { changeLang } = InternationalisationSlice.actions;

export default InternationalisationSlice.reducer;
