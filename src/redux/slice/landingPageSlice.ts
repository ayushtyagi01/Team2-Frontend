import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FALSE } from "sass";
import { RootState } from "../store";

interface GuestType {
  title: string;
  min: number;
  exists: string;
  max: number;
  maxAge: string;
}
interface LandingPage {
  propertyName: string[];
  headerLogo: string;
  pageTitle: string;
  bannerImage: string;
  maxLengthOfStay: number;
  typeOfGuest: GuestType[];
  availableTypeOfGuests: [];
  accessibility: string[];
  rooms: string;
  isLoading: boolean;
}

const initialState: LandingPage = {
  propertyName: [],
  headerLogo: "",
  pageTitle: "",
  bannerImage: "",
  typeOfGuest: [
    {
      title: "",
      min: 1,
      max: 1,
      exists: "true",
      maxAge: "0",
    },
  ],
  maxLengthOfStay: 0,
  accessibility: [],
  availableTypeOfGuests: [],
  rooms: "true",
  isLoading:false
};
const landingPageUrl: string | undefined =
  process.env.REACT_APP_LANDING_PAGE_URL;
export const getLandingData = createAsyncThunk(
  "landingPage/getData",
  async () => {
    if (landingPageUrl) {
      const response = await axios
        .get(landingPageUrl)
        .then((response) => response.data)
        .catch((error) => console.error(error.message));
      return response;
    }
  }
);
export const landingPageSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLandingData.fulfilled, (state, action) => {
      state.headerLogo = action.payload.headerLogo;
      state.pageTitle = action.payload.pageTitle;
      state.bannerImage = action.payload.bannerImage;
      state.maxLengthOfStay = action.payload.maxLengthOfStay;
      state.typeOfGuest = action.payload.typeOfGuest;
      state.accessibility = action.payload.accessibility;
      state.availableTypeOfGuests = action.payload.availableTypeOfGuests;
      state.rooms = action.payload.rooms;
      state.propertyName = action.payload.propertyName;
      state.isLoading=false;
    });
    builder.addCase(getLandingData.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const headerLogo = (state: RootState) => state.landingData.headerLogo;
export const pageTitle = (state: RootState) => state.landingData.pageTitle;
export const guests = (state: RootState) => state.landingData.typeOfGuest;
export const bannerImage = (state: RootState) => state.landingData.bannerImage;
export const maxLengthOfStay = (state: RootState) =>
  state.landingData.maxLengthOfStay;
export const accessibility = (state: RootState) =>
  state.landingData.accessibility;
export const availableTypeOfGuests = (state: RootState) =>
  state.landingData.availableTypeOfGuests;
export const isRooms = (state: RootState) => state.landingData.rooms;
export const propertyname = (state: RootState) =>
  state.landingData.propertyName;

export default landingPageSlice.reducer;
