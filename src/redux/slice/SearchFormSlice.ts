import { createSlice } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import { RootState } from "../store";

export interface ISearchForm {
  property_name: number;
  start_date: string;
  end_date: string;
  guests: number[];
  noOfRooms: number;
  beds: number;
  wheelchair: boolean;
}

const initialState: ISearchForm = {
  property_name: 2,
  start_date: new Date().toISOString(),
  end_date: addDays(new Date(), 2).toISOString(),
  guests: [1, 0],
  noOfRooms: 1,
  beds: 1,
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
      state.start_date = action.payload;
    },
    setEndDate: (state, action) => {
      state.end_date = action.payload;
    },
    setfillGuest: (state, action) => {
      state.guests = action.payload;
    },
    setGuests: (state, action) => {
      state.guests[action.payload[1]] = action.payload[0];
    },
    setRooms: (state, action) => {
      state.noOfRooms = action.payload;
    },
    setBeds: (state, action) => {
      state.beds = action.payload;
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
export const beds = (state: RootState) => state.searchForm.beds;
export const start_date = (state: RootState) => state.searchForm.start_date;
export const end_date = (state: RootState) => state.searchForm.end_date;
export const formData = (state: RootState) => state.searchForm;

export const {
  setProperty,
  setGuests,
  setRooms,
  isWheelchair,
  setStartDate,
  setEndDate,
  setfillGuest,
  setBeds,
} = SearchFormSlice.actions;

export default SearchFormSlice.reducer;
