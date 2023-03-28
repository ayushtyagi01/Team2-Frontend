import { createSlice } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import { RootState } from "../store";

interface SearchForm {
  property_name: string[];
  start_date: string,
  end_date: string;
  guests: number[];
  noOfRooms: number;
  wheelchair: boolean;
}

const initialState: SearchForm = {
  property_name: [],
  start_date: new Date().toISOString(),
  end_date: addDays(new Date(),2).toISOString(),
  guests: [1, 0],
  noOfRooms: 1,
  wheelchair: false,
};

export const SearchFormSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setProperty: (state, action) => {
      state.property_name = action.payload;
    },
    setStartDate: (state, action) => {
      console.log(action.payload);
      state.start_date = action.payload;
    },
    setEndDate: (state, action) => {
      state.end_date = action.payload;
    },
    setGuests: (state, action) => {
      state.guests[action.payload[1]] = action.payload[0];
    },
    setRooms: (state, action) => {
      state.noOfRooms = action.payload;
    },
    isWheelchair: (state, action) => {
      state.wheelchair = action.payload;
    },
  },
});

export const property_name = (state: RootState) =>
  state.searchForm.property_name;
export const guestsCount = (state: RootState) => state.searchForm.guests;
export const noOfRooms = (state: RootState) => state.searchForm.noOfRooms;
export const wheelchair = (state: RootState) => state.searchForm.wheelchair;
export const start_date = (state: RootState) => state.searchForm.start_date;
export const end_date = (state: RootState) => state.searchForm.end_date;

export const {
  setProperty,
  setGuests,
  setRooms,
  isWheelchair,
  setStartDate,
  setEndDate,
} = SearchFormSlice.actions;

export default SearchFormSlice.reducer;
